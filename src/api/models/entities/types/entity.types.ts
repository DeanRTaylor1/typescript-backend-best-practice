type ICreateAttributes<T> = Omit<T, "id">;

type IUser = {
  firstName: string;
  lastName: string;
  email: string;
};

export { ICreateAttributes, IUser };
