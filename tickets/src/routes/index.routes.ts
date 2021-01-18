import express = require('express');
import 'express-async-errors';
import { newRouter } from './createTicket.routes';
import { NotFoundError } from "@hdozdev/common";

const app = express();

// Ruta para obtener el usuario
app.use(newRouter);

app.all('*', async(req, res) => {
  throw new NotFoundError();
}); 
 
export {
  app as routes 
};