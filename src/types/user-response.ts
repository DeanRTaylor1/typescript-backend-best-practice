import { User } from "@src/db/models/user";

export type userResponse = {
  username: string;
  email: string;
  full_name: string;
  created_at: Date;
};

const convertToUserResponse = (user: User): userResponse => {
  const res: userResponse = {
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    created_at: user.created_at,
  };
  return res;
};

export { convertToUserResponse };
