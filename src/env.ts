import path from "path";
import { getOsEnv } from "@lib/env/utils";
import * as dotenv from "dotenv";

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env.${process.env.NODE_ENV || "development"}.local`
  ),
});

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  logs: {
    logDir: getOsEnv("LOG_DIR"),
    logFormat: getOsEnv("LOG_FORMAT"),
    level: getOsEnv("LOG_LEVEL"),
  },
  core: {
    port: getOsEnv("PORT"),
  },
};

export { env };
