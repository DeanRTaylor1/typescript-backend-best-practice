/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "../pool";
import pg from "pg";

export type createUserParams = {
  email: string;
  hashed_password: string;
  username: string;
  full_name: string;
};

async function createUser(arg: createUserParams) {
  try {
    const { rows } = (await pool.query(
      `INSERT INTO users (email, hashed_password, username, full_name) VALUES ($1, $2, $3, $4) RETURNING *`,
      [arg.email, arg.hashed_password, arg.username, arg.full_name]
    )) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(`Error creating user: ${error}`);
  }
}

async function getUser(email: string) {
  try {
    const { rows } = (await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ])) as pg.QueryResult<any>;
    if (rows.length === 0) {
      throw new Error(`No account found with email: ${email}`);
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Error getting user: ${error}`);
  }
}

export { createUser, getUser };
