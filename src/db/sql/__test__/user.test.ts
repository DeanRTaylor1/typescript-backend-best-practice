import { User } from "@src/db/models/user";
import { generateEmail, generateUser } from "@src/util/random";
import { createUser, getUser } from "../user";

it("should return a user", async () => {
  const user = {
    email: generateEmail(),
    hashed_password: "test",
    username: generateUser(),
    full_name: generateUser(),
  };

  const pgUser: User = await createUser(user);
  console.log("pgUser: ", pgUser);

  expect(pgUser.email).toEqual(user.email);
  expect(pgUser.full_name).toEqual(user.full_name);
  expect(pgUser.hashed_password).toEqual(user.hashed_password);
  expect(pgUser.username).toEqual(user.username);
});
