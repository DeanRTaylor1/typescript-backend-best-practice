/* By defining your database types in a separate file, 
you can reuse them across different parts of your application. 
This is especially helpful if you have complex data structures or 
multiple tables in your database. */

export type dbUser = {
  id: number;
  email: string;
  hashed_password?: string;
  username: string;
  full_name: string;
  created_at: Date;
  password_change_at: Date;
  oauth_provider?: string;
  oauth_id?: string;
};

export type userResponse = {
  username: string;
  email: string;
  full_name: string;
  created_at: Date;
};

const convertToUserResponse = (user: dbUser): userResponse => {
  const res: userResponse = {
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    created_at: user.created_at,
  };
  return res;
};

export { convertToUserResponse };
