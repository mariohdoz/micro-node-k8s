import { app } from "./server";
import mongoose from "mongoose";
import * as bodyParser from 'body-parser';
// import cookieSession from "cookie-session";
import config from "../config/index";

import { routes } from '../routes/index.routes';
import { errorHandler } from '../middlewares/error-handler';

app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: true
//   }
// ));

app.use(routes);
app.use(errorHandler);

const start = async () => {

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