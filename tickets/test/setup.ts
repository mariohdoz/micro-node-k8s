import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
// import { app } from "../src/server/server";

let mongo: any;
beforeAll(async () => {

  process.env.JWT_KEY = 'testkey';
  
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })

});

beforeEach( async () => {
  const collections  =  await mongoose.connection.db.collections();

  collections.forEach((collection) => {
    collection.deleteMany({});
  });

});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});