export type dbAccount = {
  id: number;
  user: number;
  currency: string;
  balance: number;
  created_at: Date;
};

export type accountResponse = {
  user: number;
  currency: string;
  balance: number;
  created_at: Date;
};

export type createAccountParams = {
  user: number;
  currency: string;
};

const convertToaccountResponse = (account: dbAccount): accountResponse => {
  const res: accountResponse = {
    user: account.user,
    currency: account.currency,
    balance: account.balance,
    created_at: account.created_at,
  };
  return res;
};

export { convertToaccountResponse };
