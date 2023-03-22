/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbUser } from "../models/user";
import pool from "../pool";
import pg from "pg";
import { createAccountParams } from "../models/account";

async function createAccount(arg: createAccountParams) {
  try {
    const { rows } = (await pool.query(
      `INSERT INTO users (user, currency) VALUES ($1, $2) RETURNING *`,
      [arg.user, arg.currency]
    )) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAccount(userid: number) {
  const sql = `SELECT * FROM accounts
    WHERE user = $1 LIMIT 1`;
  const { rows } = (await pool.query(sql, [userid])) as pg.QueryResult<any>;

  return rows[0];
}

/* adding FOR NO KEY UPDATE ensures that the selected row is locked with a weaker lock, 
so that other transactions can still read the row, 
but can't modify it using a SELECT FOR UPDATE or 
SELECT FOR NO KEY UPDATE statement until the lock is released. 
This can be useful in situations where you want to ensure that only one 
transaction is modifying a specific row at a time. */

const getAccountForUpdate = async (id: number) => {
  const sql = `SELECT id, user, balance, currency, created_at FROM accounts
      WHERE id = $1 LIMIT 1
      FOR NO KEY UPDATE`;

  const { rows } = (await pool.query(sql, [id])) as pg.QueryResult<any>;
  return rows[0];
};

const updateBalance = async (userid: number, amount: number) => {
  const sql = `UPDATE accounts 
    SET balance = balance + $1
    WHERE user = $2
    RETURNING *
    `;
  const { rows } = (await pool.query(sql, [
    userid,
    amount,
  ])) as pg.QueryResult<any>;

  return rows[0];
};

const updateAccount = (id: number, balance: number) => {
  const sql = `UPDATE accounts SET balance = $2
    WHERE id = $1
    RETURNING id, owner, balance, currency, created_at
    `;
  const { rows } = (await pool.query(sql, [
    id,
    balance,
  ])) as pg.QueryResult<any>;

  return rows[0];
};

export { createAccount, getAccount, getAccountForUpdate, updateBalance };
