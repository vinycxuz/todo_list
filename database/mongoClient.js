import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  await connect(process.env.STRING_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
}
