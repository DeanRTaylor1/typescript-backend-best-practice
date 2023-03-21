import { Password } from "../password";
import { generateString } from "../random";

it("hashes and returns a the hashedpassword correctly", async () => {
  const password = generateString();

  const hashed_password = await Password.toHash(password);

  expect(hashed_password).not.toEqual(password);
  expect(hashed_password).not.toBeFalsy();
});

it("returns true if asked to compare the correct password", async () => {
  const password = generateString();

  const hashed_password = await Password.toHash(password);

  const result = await Password.compare(hashed_password, password);

  expect(result).toBeTruthy();
});

it("returns false if asked to compare the incorrect password", async () => {
  const password = generateString();
  const wrong_password = generateString();
  const hashed_password = await Password.toHash(password);

  const result = await Password.compare(hashed_password, wrong_password);

  expect(result).toBeFalsy();
});

it("generates different passwords even when given the same inputs", async () => {
  const password = generateString();

  const hashed_password1 = await Password.toHash(password);
  const hashed_password2 = await Password.toHash(password);

  expect(hashed_password1).not.toEqual(hashed_password2);
});
