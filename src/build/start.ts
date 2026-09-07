import * as fs from "node:fs";
import { access, cp as copyDir, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import { logger } from "./logger.js";

const ROOT = resolve(process.cwd());
const DIST = resolve(ROOT, "dist");
const APPS = resolve(ROOT, "src/apps");
const APP_PUBLIC_DIR_NAME = "public";
const APP_FILE_NAME = "app";

const listDirectories = async (path: string): Promise<string[]> => {
  const entries = await readdir(path, { withFileTypes: true });
  const dirList = entries.filter((entry) => entry.isDirectory());

  return dirList.map((entry) => entry.name);
};

const createDistFolderSync = (): void => {
  try {
    if (fs.existsSync(DIST)) {
      fs.rmSync(DIST, { recursive: true, force: true });
    }
    fs.mkdirSync(DIST);
  } catch (error: unknown) {
    logger.error("❌ Cannot create the dist folder.");
    if (error instanceof Error) {
      logger.error(error);
    }
    throw error;
  }
};

const buildBrowserJs = async (
  entryFile: string,
  outFile: string,
): Promise<void> => {
  return build({
    entryPoints: [entryFile],
    bundle: true,
    outfile: outFile,
    platform: "browser",
    format: "iife",
    sourcemap: true,
    minify: true,
  })
    .then(() => {
      logger.log(`✅ Build of application ${entryFile} succeeded.`);
    })
    .catch((error) => {
      logger.error(`❌ Build of application ${entryFile} failed:`, error);
    });
};

type ErrorWithCode = Error & { code: string };
const isErrorWithCode = (error: unknown): error is ErrorWithCode => {
  return error instanceof Error && Object.hasOwn(error, "code");
};

const buildApp = async (appDir: string): Promise<void> => {
  logger.info(`Building app "${appDir}"`);
  // copy public dir if exists
  const publicDir = resolve(APPS, appDir, APP_PUBLIC_DIR_NAME);
  await copyDir(publicDir, `${DIST}/${appDir}/${APP_PUBLIC_DIR_NAME}`, {
    recursive: true,
  }).catch((error: unknown) => {
    if (isErrorWithCode(error) && error.code === "ENOENT") {
      logger.info(
        `No "${APP_PUBLIC_DIR_NAME}" folder found in the app "${appDir}".`,
      );
    } else {
      throw error;
    }
  });
  // build JS and CSS
  const rnd = Math.random().toString(36).substring(2, 15);
  const entryFile = `${resolve(APPS, appDir, APP_FILE_NAME)}.ts`;
  const outFile = `${resolve(DIST, appDir, APP_FILE_NAME)}-${rnd}.js`;
  try {
    await access(entryFile);
    await buildBrowserJs(entryFile, outFile);
  } catch (_error: unknown) {
    logger.error(`No application entry point found: "${entryFile}"`);
  }

  let cssTag = "";
  try {
    await access(resolve(DIST, appDir, `${APP_FILE_NAME}-${rnd}.css`));
    cssTag = `<link rel="stylesheet" href="./${APP_FILE_NAME}-${rnd}.css">`;
  } catch (_error: unknown) {
    logger.info(`No CSS found in ${appDir}`);
  }

  // create index.html
  await writeFile(
    resolve(DIST, appDir, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<script src="./${APP_FILE_NAME}-${rnd}.js"></script>${cssTag}
</head>
<body></body>
</html>`,
  );
};

const main = async (): Promise<void> => {
  createDistFolderSync();
  const apps = await listDirectories(APPS);
  for (const app of apps) {
    buildApp(app).catch(logger.error);
  }
};

main().catch((error: unknown): void => {
  logger.error(error);
  throw error;
});
