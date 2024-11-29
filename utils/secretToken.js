import dotenv from "dotenv";
import pkg from "jsonwebtoken";

const { sign } = pkg;
dotenv.config();

export function secretToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}
