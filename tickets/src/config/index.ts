if (process.env.NODE_ENV !== "production") {
  const dotenv: any = require("dotenv");
  dotenv.config();
}

if(!process.env.JWT_KEY){
  throw new Error('JWT_KEY debe estar definida');
}

if(!process.env.MONGO_URI){
  throw new Error('MONGO_URI debe estar definida');
} 

if(!process.env.NATS_CLIENT_ID){
  throw new Error('NATS_CLIENT_ID debe estar definida');
} 

if(!process.env.NATS_CLUSTER_ID){
  throw new Error('NATS_CLUSTER_ID debe estar definida');
} 

if(!process.env.NATS_URL){
  throw new Error('NATS_URL debe estar definida');
} 

const PORT:number = parseInt(`${process.env.PORT}`, 10) || 3000;
const NATS_CLIENT_ID:string = process.env.NATS_CLIENT_ID!;
const NATS_CLUSTER_ID:string = process.env.NATS_CLUSTER_ID!;
const NATS_URL:string = process.env.NATS_URL!;
const MONGO_URI:string = process.env.MONGO_URI!;
const JWT_KEY: string = process.env.JWT_KEY!;

export default {
  PORT,
  MONGO_URI,
  JWT_KEY,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
  NATS_URL
}