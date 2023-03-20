const alphabet = "abcdefghijklmnopqrstuvwxyz";

function generateEmail() {
  let email = "";
  for (let i = 0; i < 6; i++) {
    email += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `${email}@gmail.com`;
}

function generateUser() {
  let user = "";
  for (let i = 0; i < 9; i++) {
    user += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `${user}`;
}

export { generateEmail, generateUser };
