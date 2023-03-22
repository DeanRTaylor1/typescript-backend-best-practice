import { createAccountParams, dbAccount } from "@src/db/models/account";
import { createAccount } from "@src/db/sql/account.sql";
import { createUser, createUserParams } from "@src/db/sql/user.sql";

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
  const user = generateUser();
  const pgUser = await createUser(user);
  const accountParams = generateCreateAccountParams(pgUser.id);
  const pgAccount = await createAccount(accountParams);
  return pgAccount;
}

export {
  generateEmail,
  generateUser,
  generateString,
  generateCreateAccountParams,
  createRandomAccount,
};
