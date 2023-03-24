import { NotAuthorizedError } from "../../errors";
import { createToken, isValid, payload, verifyToken } from "../paseto";
import { generateEmail, generateString } from "../random";

it("generates a paseto token based upon a valid input string", async () => {
  const email = generateEmail();
  const username = generateString();

  const { token } = await createToken(1, email, username, 15);

  expect(token).toBeTruthy();
});

it("returns the correct payload if given a valid PASETO token and key", async () => {
  const email = generateEmail();
  const username = generateString();

  const { token } = await createToken(1, username, email, 15);

  const payload = (await verifyToken(token)) as payload;
  expect(payload).toBeTruthy();
  expect(payload.email).toEqual(email);
  expect(payload.username).toEqual(username);
  expect(payload.user_id).toEqual(1);
  expect(payload.id).toBeTruthy();
});

it("returns an empty string if given an invalid PASETO token", async () => {
  const email = generateEmail();
  const username = generateString();

  const { token } = await createToken(1, username, email, 15);

  await expect(verifyToken("token" + token)).rejects.toThrow();
});

it("returns true if token has not expired", async () => {
  const email = generateEmail();
  const username = generateString();

  const { token } = await createToken(1, email, username, 15);

  const payload = (await verifyToken(token)) as payload;

  const valid = isValid(payload);
  expect(valid).toBeTruthy();
});

it("throws an error if token has expired", async () => {
  const email = generateEmail();
  const username = generateString();

  const { token } = await createToken(1, email, username, -15);

  await expect(verifyToken(token)).rejects.toThrow(NotAuthorizedError);
});
