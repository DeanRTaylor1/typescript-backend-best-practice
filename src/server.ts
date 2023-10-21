import { App } from "@app";
import { validateEnv } from "@lib/env/utils";

validateEnv();

(() => {
  console.log(process.cwd());
  const app = new App();
  app.listen();
})();
