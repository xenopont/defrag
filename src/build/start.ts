import * as fs from "node:fs";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { logger } from "./logger.js";

const ROOT = resolve(process.cwd());
const DIST = resolve(ROOT, "dist");
const APPS = resolve(ROOT, "src/apps");

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

const main = async (): Promise<void> => {
  createDistFolderSync();
  logger.info(await listDirectories(APPS));
};

main().catch((error: unknown): void => {
  logger.error(error);
  throw error;
});
