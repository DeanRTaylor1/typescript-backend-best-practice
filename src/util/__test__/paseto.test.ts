import { createToken, isValid, payload, verifyToken } from "../paseto";
import { generateEmail, generateString } from "../random";

it("generates a paseto token based upon a valid input string", async () => {
  const email = generateEmail();
  const username = generateString();

  const token = await createToken(email, username, 15);

  expect(token).toBeTruthy();
});

it("returns the correct payload if given a valid PASETO token and key", async () => {
  const email = generateEmail();
  const username = generateString();

  const token = await createToken(email, username, 15);

  const payload = (await verifyToken(token)) as payload;
  expect(payload).toBeTruthy();
  expect(payload.email).toEqual(email);
  expect(payload.username).toEqual(username);
});

it("returns an empty string if given an invalid PASETO token", async () => {
  const email = generateEmail();
  const username = generateString();

  const token = await createToken(email, username, 15);

  const payload = await verifyToken("token" + token);
  expect(payload).toBeFalsy();
});

it("returns true if token has not expired", async () => {
  const email = generateEmail();
  const username = generateString();

  const token = await createToken(email, username, 15);

  const payload = (await verifyToken(token)) as payload;

  const valid = isValid(payload);
  expect(valid).toBeTruthy();
  console.log(valid);
});

it("returns false if token has not expired", async () => {
  const email = generateEmail();
  const username = generateString();

  const token = await createToken(email, username, -15);

  const payload = (await verifyToken(token)) as payload;

  expect(payload).toBeFalsy();
});
