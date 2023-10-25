import { env } from "@env";

import * as jwt from "jsonwebtoken";
import { scrypt, randomBytes } from "crypto";
import { Service } from "typedi";

@Service()
export class AuthService {
  hashpassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(8).toString("hex");
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(`${derivedKey.toString("hex")}.${salt}`);
      });
    });
  }

  compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hashedPassword, salt] = storedPassword.split(".");
      scrypt(suppliedPassword, salt, 64, (err: unknown, derivedKey: Buffer) => {
        if (err) reject(err);
        else resolve(derivedKey.toString("hex") === hashedPassword);
      });
    });
  }

  generateJWT({ userId, email }: JwtProps): string {
    const secret = env.auth.jwtSecret;
    const expiresIn = env.auth.expiresIn;

    const token = jwt.sign({ userId, email }, secret, { expiresIn });
    return token;
  }

  validateJWT(token: string): Promise<JwtProps> {
    return new Promise((resolve, reject) => {
      const secret = env.auth.jwtSecret;

      jwt.verify(token, secret, (err: unknown, decoded: JwtProps) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

export type JwtProps = {
  userId: number;
  email: string;
};
