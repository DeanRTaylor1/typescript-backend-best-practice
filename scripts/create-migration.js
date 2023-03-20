const { exec } = require("child_process");

(() => {
  const args = process.argv.slice(2);
  const migrationName = args[0];
  exec(
    `db-migrate create ${migrationName} --config ./src/db/database.json ./src/db/database.json --migrations-dir ./src/db/migrations --sql-file`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    },
  );
})();
