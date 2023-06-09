import { app } from "./app";
import { colors } from "./util";

import pool from "./db/pool";

const PORT = process.env.PORT || 8080;

// start the Express server and do initial setup here

(async () => {
  if (
    !process.env.PG_HOST ||
    !process.env.PG_USERNAME ||
    !process.env.PG_PASSWORD ||
    !process.env.PASETO_KEY ||
    !process.env.ACCESS_TOKEN_DURATION ||
    !process.env.REFRESH_TOKEN_DURATION
  ) {
    console.log(
      colors.FgRed,
      "Missing environment variables! Please check your .env file, more information in Readme.md."
    );
    console.log(colors.Reset, "");
    process.exit(1);
  }

  try {
    console.log(colors.FgCyan, "initializing api...");
    pool.connect({
      host: process.env.PG_HOST,
      port: 5432,
      database: "typescript-backend-best-practice",
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
    });

    console.log(colors.FgGreen, "Connected to pg...");
  } catch (err) {
    console.log(colors.FgRed, "Error connecting to database");
    console.log(colors.Reset, "");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(colors.FgCyan, `Listening on port ${PORT}`);
    console.log(colors.Reset, "");
  });
})();
