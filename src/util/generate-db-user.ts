import { dbUser } from "../db/models/user";
import { createUserParams, createUser } from "../db/sql";
import { generateUser } from "./random";

//utility function to generate a random user and add to the database, returns the dbUser
const generateDbUser = async (): Promise<dbUser> => {
  const user = generateUser() as createUserParams;

  const pgUser: dbUser = await createUser(
    user.email,
    user.hashed_password,
    user.username,
    user.full_name
  );

  return pgUser;
};

export { generateDbUser };
