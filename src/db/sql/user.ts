import { User } from "../models/user";
import pool from "../pool";

export type createUserParams = {
  email: string;
  hashed_password: string;
  username: string;
  full_name: string;
};

async function createUser(arg: createUserParams) {
  try {
    const response = await pool.query(
      `INSERT INTO users (email, hashed_password, username, full_name) VALUES ($1, $2, $3, $4) RETURNING *`,
      [arg.email, arg.hashed_password, arg.username, arg.full_name]
    );
    if (!response) {
      throw new Error("User not created");
    }
    const { rows } = response;

    return rows[0] as unknown as User;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser(email: string) {
  const response = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (!response) {
    throw new Error("User not found");
  }

  const { rows } = response;

  return rows[0] as unknown as User;
}

// export function convertToCamelCase(rows: any) {
//   console.log("rows: ", rows);
//   const converted = Object.entries(rows).map(([key, value]) => {
//     return [convertStringToCamelCase(key), value];
//   });
//   console.log(converted);
//   return converted;
// }

// function convertStringToCamelCase(key: string) {
//   const parts = key.split("_");
//   for (let i = 1; i < parts.length; i++) {
//     parts[i] = parts[i].slice(0, 1).toUpperCase() + parts[i].slice(1);
//   }
//   console.log(parts.join(""));
//   return parts.join("");
// }

export { createUser, getUser };
