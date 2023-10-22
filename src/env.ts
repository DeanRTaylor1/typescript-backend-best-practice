import path from "path";
import { getOsEnv } from "@lib/env/utils";
import * as dotenv from "dotenv";

const envPath = path.join(
  process.cwd(),
  `.env.${process.env.NODE_ENV || "development"}.local`
);

dotenv.config({ path: envPath });

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
  db: {
    username: getOsEnv("DB_USERNAME"),
    password: getOsEnv("DB_PASSWORD"),
    database: getOsEnv("DB_DATABASE"),
    host: getOsEnv("DB_HOST"),
    dialect: getOsEnv("DB_DIALECT"),
  },
};

export { env };
