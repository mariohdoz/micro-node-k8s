import { app } from "./server";
import mongoose from "mongoose";
import config from "../config/index";

const start = async () => {

  try {
    await mongoose.connect(config.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('Base de datos conectada')
  } catch (err) {
    console.log(err)
  }

  app.listen(config.PORT, () => {
    console.log(`Ticket Escuchando en puerto ${config.PORT}!!`);
  });

}

start();