import express from 'express';
import mongoose from "mongoose";
import * as bodyParser from 'body-parser';

import { routes } from '../routes/index.routes';
import { errorHandler } from '../middlewares/error-handler';

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);
app.use(errorHandler);

const start = async () => {

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

    console.log('Base de datos conectada')
  } catch (err) {
    console.log(err)
  }

  app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}!!`);
  });

}

start();