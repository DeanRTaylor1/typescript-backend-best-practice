CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "user" integer NOT NULL,
  "currency" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "accounts" ("user");

CREATE UNIQUE INDEX ON "accounts" ("user", "currency");

ALTER TABLE "accounts" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
