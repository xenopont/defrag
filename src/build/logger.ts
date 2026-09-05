/** biome-ignore-all lint/suspicious/noConsole: Logger functionality */

type TLoggable = string | Error | unknown;

interface ILogger {
  error: (...data: TLoggable[]) => void;
  info: (...data: TLoggable[]) => void;
  log: (...data: TLoggable[]) => void;
  warn: (...data: TLoggable[]) => void;
}

export const logger: ILogger = {
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};
