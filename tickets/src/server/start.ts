import { app } from "./server";
import mongoose from "mongoose";
import config from "../config/index";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {

  try {
    await natsWrapper.connect(config.NATS_CLUSTER_ID, config.NATS_CLIENT_ID, config.NATS_URL);
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    console.log("NATS conectado");

  } catch (err) {
    console.log(err);
  }

  try {
    await mongoose.connect(config.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('Base de datos conectada');
  } catch (err) {
    console.log(err);
  }

  app.listen(config.PORT, () => {
    console.log(`Ticket Escuchando en puerto ${config.PORT}!!`);
  });

}

start();