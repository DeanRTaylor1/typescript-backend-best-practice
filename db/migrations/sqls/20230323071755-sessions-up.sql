CREATE TABLE "sessions" (
  "id" varchar PRIMARY KEY,
  "email" varchar NOT NULL,
  "refresh_token" varchar,
  "user_agent" varchar,
  "client_ip" varchar,  
  "is_blocked" boolean NOT NULL DEFAULT false,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE "sessions" ADD FOREIGN KEY ("email") REFERENCES "users" ("email");