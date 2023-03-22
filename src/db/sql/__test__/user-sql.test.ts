import { dbUser } from "@src/db/models/user";
import { generateUser } from "@src/util";
import { createUser, getUser } from "../user.sql";

it("should create a user successfully with the correct parameters", async () => {
  const user = generateUser();

  const pgUser: dbUser = await createUser(user);

  expect(pgUser.email).toEqual(user.email);
  expect(pgUser.full_name).toEqual(user.full_name);
  expect(pgUser.hashed_password).toEqual(user.hashed_password);
  expect(pgUser.username).toEqual(user.username);
});

it("should return a user with the correct paramaters if the user exists", async () => {
  const user = generateUser();

  const pgUser: dbUser = await createUser(user);

  expect(pgUser.email).toEqual(user.email);
  expect(pgUser.full_name).toEqual(user.full_name);
  expect(pgUser.hashed_password).toEqual(user.hashed_password);
  expect(pgUser.username).toEqual(user.username);

  const existingUser = (await getUser(pgUser.email)) as dbUser;

  expect(existingUser).toBeTruthy();

  expect(existingUser.email).toEqual(user.email);
  expect(existingUser.full_name).toEqual(user.full_name);
  expect(existingUser.hashed_password).toEqual(user.hashed_password);
  expect(existingUser.username).toEqual(user.username);
});
