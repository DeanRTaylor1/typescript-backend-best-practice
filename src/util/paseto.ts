/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @fileoverview Provides functions for creating and verifying PASETO tokens.
 * @module auth/paseto
 */
import uniqid from "uniqid";
import { V3 } from "paseto";
import { NotAuthorizedError } from "../errors";

export type payload = {
  id: string;
  user_id: number;
  username: string;
  email: string;
  issued_at: number;
  expires_at: number;
};

export async function createToken(
  user_id: number,
  username: string,
  email: string,
  duration: number
) {
  const payload = newPayload(user_id, email, username, duration * 60000);

  try {
    const token = await V3.encrypt(payload, process.env.PASETO_KEY!);

    return { token, payload };
  } catch (error) {
    throw new Error(`Error creating token: ${error}`);
  }
}

export async function verifyToken(token: string) {
  try {
    const payload = (await V3.decrypt(
      token,
      process.env.PASETO_KEY!
    )) as payload;

    const valid = isValid(payload);
    if (!valid) {
      throw new Error("Token is not valid");
    }

    return payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }
}

function newPayload(
  user_id: number,
  email: string,
  username: string,
  duration: number
): payload {
  const payload = {
    id: uniqid(),
    user_id,
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
