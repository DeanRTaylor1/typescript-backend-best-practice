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
      scrypt(suppliedPassword, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString("hex") === hashedPassword);
      });
    });
  }
}
