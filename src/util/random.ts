import { createUserParams } from "@src/db/sql/user";

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

export { generateEmail, generateUser, generateString };
