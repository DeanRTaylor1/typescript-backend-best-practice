/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require("child_process");

(() => {
  const args = process.argv.slice(2);
  const migrationName = args[0];
  exec(
    `db-migrate create ${migrationName} --config ./db/database.json  --migrations-dir ./db/migrations --sql-file`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    }
  );
})();
