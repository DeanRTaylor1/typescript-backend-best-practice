import pool from "@src/db/pool";

beforeAll(async () => {
  // TODO - add database connection and env variable setup
  process.env.PASETO_KEY = "12345678901234567890123456789012";
  try {
    pool.connect({
      host: "localhost",
      port: 5432,
      database: "typescript-backend-best-practice",
      user: "root",
      password: "secret",
    });
    console.log("connected to test pg");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

afterAll(async () => {
  await pool.close();
});
