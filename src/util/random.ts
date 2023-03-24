import { createAccountParams, dbAccount } from "../db/models/account";
import { createUserParams, createAccount } from "../db/sql";
import { generateDbUser } from "./generate-db-user";
import uniqid from "uniqid";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function generateEmail() {
  let email = "";
  for (let i = 0; i < 6; i++) {
    email += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `${email}@gmail.com`;
}

function generateString() {
  let user = "";
  for (let i = 0; i < 9; i++) {
    user += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `${user}`;
}

//utility function to generate a random user to be added to the database
function generateUser(): createUserParams {
  const user: createUserParams = {
    email: generateEmail(),
    hashed_password: "test",
    username: generateString(),
    full_name: generateString(),
  };

  return user;
}

function generateCreateAccountParams(id: number): createAccountParams {
  const createAccountParams = {
    owner_id: id,
    currency: "USD",
  };
  return createAccountParams;
}

async function createRandomAccount(): Promise<dbAccount> {
  const pgUser = await generateDbUser();
  const accountParams = generateCreateAccountParams(pgUser.id);
  const pgAccount = await createAccount(accountParams);
  return pgAccount;
}

function generateSession(email: string) {
  const session = {
    id: uniqid(),
    email,
    refresh_token: generateString(),
    user_agent: generateString(),
    client_ip: generateString(),
    expires_at: new Date(),
  };
  return session;
}

export {
  generateSession,
  generateEmail,
  generateUser,
  generateString,
  generateCreateAccountParams,
  createRandomAccount,
};
