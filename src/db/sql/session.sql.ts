/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "../pool";
import pg from "pg";

async function createSession(
  id: string,
  email: string,
  refresh_token: string,
  user_agent: string,
  client_ip: string,
  expires_at: Date
) {
  const sql = `INSERT INTO sessions (id, email, refresh_token, user_agent, client_ip, expires_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  try {
    const { rows } = (await pool.query(sql, [
      id,
      email,
      refresh_token,
      user_agent,
      client_ip,
      expires_at.toISOString(),
    ])) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    throw new Error(`Error creating session: ${error}`);
  }
}

async function getSession(id: string) {
  const sql = `SELECT * FROM sessions WHERE id = $1;`;
  try {
    const { rows } = (await pool.query(sql, [id])) as pg.QueryResult<any>;
    if (rows.length === 0) {
      throw new Error(`No session found with id: ${id}`);
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Error getting session: ${error}`);
  }
}

export { getSession, createSession };
