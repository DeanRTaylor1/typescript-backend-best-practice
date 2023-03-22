/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { V3 } from "paseto";

export type payload = {
  username: string;
  email: string;
  issued_at: number;
  expires_at: number;
};

export async function createToken(
  id: number,
  username: string,
  email: string,
  duration: number
) {
  const payload = newPayload(id, email, username, duration * 60000);

  const token = await V3.encrypt(payload, process.env.PASETO_KEY!);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const payload = (await V3.decrypt(
      token,
      process.env.PASETO_KEY!
    )) as payload;

    const valid = isValid(payload);
    if (!valid) {
      return "";
    }

    return payload;
  } catch (err) {
    return "";
  }
}

function newPayload(
  id: number,
  username: string,
  email: string,
  duration: number
): payload {
  const payload = {
    id,
    username,
    email,
    issued_at: new Date().getTime(),
    expires_at: new Date().getTime() + duration,
  };
  return payload;
}

export function isValid(payload: payload) {
  if (new Date().getTime() > payload.expires_at) {
    return false;
  }
  return true;
}
