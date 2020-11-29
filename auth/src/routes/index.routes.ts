import express = require('express');
import 'express-async-errors';
import {currentUserRouter} from './current-user.routes';
import {signRouter} from './sign.routes';
import { NotFoundError } from "../errors/index.errors";

const app = express();

// Ruta para obtener el usuario
app.use(currentUserRouter);

// Ruta para login
app.use(signRouter);

app.all('*', async(req, res, next) => {
  // next (new NotFoundError());
  throw new NotFoundError();
}); 
 
export {
  app as routes 
};