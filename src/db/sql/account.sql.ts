/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from "../pool";
import pg from "pg";
import { createAccountParams } from "../models/account";

async function createAccount(arg: createAccountParams) {
  try {
    const { rows } = (await pool.query(
      `INSERT INTO accounts (owner_id, currency) VALUES ($1, $2) RETURNING *;`,
      [arg.owner_id, arg.currency]
    )) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    throw new Error(`Error creating account: ${error}`);
  }
}

async function getAccount(owner_id: number) {
  const sql = `SELECT * FROM accounts
    WHERE owner_id = $1 LIMIT 1`;
  try {
    const { rows } = (await pool.query(sql, [owner_id])) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    throw new Error(`Error getting account: ${error}`);
  }
}

/* adding FOR NO KEY UPDATE ensures that the selected row is locked with a weaker lock, 
so that other transactions can still read the row, 
but can't modify it using a SELECT FOR UPDATE or 
SELECT FOR NO KEY UPDATE statement until the lock is released. 
This can be useful in situations where you want to ensure that only one 
transaction is modifying a specific row at a time. */

const getAccountForUpdate = async (id: number) => {
  const sql = `SELECT id, owner_id, balance, currency, created_at FROM accounts
      WHERE id = $1 LIMIT 1
      FOR NO KEY UPDATE`;

  try {
    const { rows } = (await pool.query(sql, [id])) as pg.QueryResult<any>;
    return rows[0];
  } catch (error) {
    throw new Error(`Error getting account: ${error}`);
  }
};

const updateAccount = async (id: number, balance: number) => {
  const sql = `UPDATE accounts SET balance = $2
    WHERE id = $1
    RETURNING id, owner_id, balance, currency, created_at
    `;

  try {
    const { rows } = (await pool.query(sql, [
      id,
      balance,
    ])) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    throw new Error(`Error updating account: ${error}`);
  }
};

const addAccountBalance = async (owner_id: number, amount: number) => {
  const sql = `UPDATE accounts 
      SET balance = balance + $1
      WHERE owner_id = $2
      RETURNING *
      `;

  try {
    const { rows } = (await pool.query(sql, [
      owner_id,
      amount,
    ])) as pg.QueryResult<any>;

    return rows[0];
  } catch (error) {
    throw new Error(`Error adding account balance: ${error}`);
  }
};

const deleteAccount = async (owner_id: number) => {
  const sql = `DELETE FROM accounts WHERE owner_id = $1 RETURNING *`;

  const { rows } = (await pool.query(sql, [owner_id])) as pg.QueryResult<any>;
  if (rows.length === 0) {
    throw new Error(`No account found with owner_id ${owner_id}`);
  }
  return rows[0];
};

export {
  createAccount,
  getAccount,
  getAccountForUpdate,
  addAccountBalance,
  updateAccount,
  deleteAccount,
};
