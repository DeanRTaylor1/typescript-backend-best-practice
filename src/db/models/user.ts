export type User = {
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
