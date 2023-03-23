import {
  generateUser,
  generateCreateAccountParams,
  createRandomAccount,
} from "../../../util";
import { createAccountParams, dbAccount } from "../../models/account";
import { dbUser } from "../../models/user";
import { createAccount, deleteAccount, getAccount } from "../account.sql";
import { createUser } from "../user.sql";

it("should create an account successfully with the correct parameters", async () => {
  const user = generateUser();

  const pgUser: dbUser = await createUser(user);

  const accountParams: createAccountParams = {
    owner_id: pgUser.id,
    currency: "USD",
  };
  const account = (await createAccount(accountParams)) as unknown as dbAccount;
  console.log(account);
  expect(account).toBeTruthy();
  expect(account.owner_id).toEqual(pgUser.id);
  expect(account.currency).toEqual(accountParams.currency);
  expect(account.balance).toBe("0");
});

it("throws an error if user already has an account", async () => {
  const user = generateUser();

  const pgUser: dbUser = await createUser(user);

  const accountParams: createAccountParams = {
    owner_id: pgUser.id,
    currency: "USD",
  };
  await createAccount(accountParams);
  await expect(createAccount(accountParams)).rejects.toThrow();
});

it("finds the account if given correct paramaters", async () => {
  const user = generateUser();

  const pgUser: dbUser = await createUser(user);

  const accountParams = generateCreateAccountParams(pgUser.id);
  const account1 = await createAccount(accountParams);

  const account2 = await getAccount(account1.owner_id);

  expect(account2).toHaveProperty("id");
  expect(account2).toHaveProperty("owner_id", account1.owner_id);
  expect(account2).toHaveProperty("currency", account1.currency);
  expect(account2).toHaveProperty("balance", "0");
});

it("returns falsy value if given an invalid id", async () => {
  expect(await getAccount(1000000)).toBeFalsy;
});

it("deletes the account successfully", async () => {
  const pgAccount = await createRandomAccount();
  const foundAccount = await getAccount(pgAccount.owner_id);

  expect(foundAccount).toBeTruthy();
  const deletedAccount = await deleteAccount(pgAccount.owner_id);

  expect(deletedAccount).toHaveProperty("id", pgAccount.id);
  expect(deletedAccount).toHaveProperty("owner_id", pgAccount.owner_id);
  expect(deletedAccount).toHaveProperty("currency", pgAccount.currency);
  expect(deletedAccount).toHaveProperty("balance", pgAccount.balance);

  const notFoundAccount = await getAccount(pgAccount.owner_id);
  expect(notFoundAccount).toBeFalsy();
});

it("throws an error if account doesn't exist", async () => {
  const pgAccount = await createRandomAccount();
  const foundAccount = await getAccount(pgAccount.owner_id);

  expect(foundAccount).toBeTruthy();
  await deleteAccount(pgAccount.owner_id);

  await expect(deleteAccount(pgAccount.owner_id)).rejects.toThrow();
});
