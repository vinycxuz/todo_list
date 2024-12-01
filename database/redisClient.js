import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
})

client.on('error', err => console.log('Redis Client Error', err));
  
export async function connectRedis(){
  await client.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.log(err);
  });
}

export default client;

