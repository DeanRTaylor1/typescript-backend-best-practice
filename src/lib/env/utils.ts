import { cleanEnv, port, str } from "envalid";

const isUndefined = (prop: string | number | unknown) => {
  return typeof prop === "undefined";
};

const getOsEnv = (key: string): string => {
  if (isUndefined(process.env[key])) {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key];
};

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    port: port(),
  });
};

export { getOsEnv, validateEnv };
