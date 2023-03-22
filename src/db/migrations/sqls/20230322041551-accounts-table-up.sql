CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "user" integer UNIQUE NOT NULL,
  "currency" varchar NOT NULL,
  "balance" BIGINT NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ON "accounts" ("user");

CREATE UNIQUE INDEX ON "accounts" ("user");

ALTER TABLE "accounts" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
