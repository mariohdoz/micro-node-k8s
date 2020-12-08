if (process.env.NODE_ENV !== "production") {
  const dotenv: any = require("dotenv");
  dotenv.config();
}

const PORT:number = parseInt(`${process.env.PORT}`, 10) || 3000;
const MONGO_URI:string = process.env.MONGO_URI!;
const JWT_KEY: string = process.env.JWT_KEY!;

export default {
  PORT,
  MONGO_URI,
  JWT_KEY
}