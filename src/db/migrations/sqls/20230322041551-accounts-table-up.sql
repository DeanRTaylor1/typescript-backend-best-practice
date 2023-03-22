CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" integer UNIQUE NOT NULL,
  "currency" varchar NOT NULL,
  "balance" BIGINT NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON "accounts" ("owner_id");

ALTER TABLE "accounts" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");
