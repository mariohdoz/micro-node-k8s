if (process.env.NODE_ENV !== "production") {
  const dotenv: any = require("dotenv");
  dotenv.config();
}

const PORT:number = parseInt(`${process.env.PORT}`, 10) || 3000;
const MONGO_URI:string = process.env.MONGO_URI!;

export default {
  PORT,
  MONGO_URI
}