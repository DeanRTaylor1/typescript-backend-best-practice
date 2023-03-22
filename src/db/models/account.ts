import { currency } from "@src/types/currency";

export type dbAccount = {
  id: number;
  owner_id: number;
  currency: currency;
  balance: bigint;
  created_at: Date;
};

export type accountResponse = {
  owner_id: number;
  currency: currency;
  balance: bigint;
  created_at: Date;
};

export type createAccountParams = {
  owner_id: number;
  currency: string;
};

const convertToaccountResponse = (account: dbAccount): accountResponse => {
  const res: accountResponse = {
    owner_id: account.owner_id,
    currency: account.currency,
    balance: account.balance,
    created_at: account.created_at,
  };
  return res;
};

export { convertToaccountResponse };
