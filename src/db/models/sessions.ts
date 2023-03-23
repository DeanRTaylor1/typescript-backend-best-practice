export type dbSession = {
  id: string;
  email: string;
  refresh_token: string;
  user_agent: string;
  client_ip: string;
  is_blocked: boolean;
  expires_at: Date;
  created_at: Date;
};

export type userSession = {
  id: string;
  refresh_token: string;
  email: string;
  expires_at: Date;
  created_at: Date;
};

const convertToUserResponse = (session: dbSession): userSession => {
  const res: userSession = {
    id: session.id,
    refresh_token: session.refresh_token,
    email: session.email,
    expires_at: session.expires_at,
    created_at: session.created_at,
  };
  return res;
};

export { convertToUserResponse };
