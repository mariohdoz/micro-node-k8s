import { app } from "./server";
import mongoose from "mongoose";
import config from "../config/index";

const start = async () => {

  if(!config.JWT_KEY){
    throw new Error('JWT_KEY debe estar definida');
  }

  if(!config.MONGO_URI){
    throw new Error('MONGO_URI debe estar definida');
  }

  try {
    await mongoose.connect(config.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('Base de datos conectada')
  } catch (err) {
    console.log(err)
  }

  app.listen(config.PORT, () => {
    console.log(`Escuchando en puerto ${config.PORT}!!`);
  });

}

start();