type ICreateAttributes<T> = Omit<T, "id">;

type IUser = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
};

export { ICreateAttributes, IUser };
