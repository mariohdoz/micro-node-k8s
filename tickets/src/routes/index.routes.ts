import express = require('express');
import 'express-async-errors';
import { newRouter } from './createTicket.routes';
import { showRouter } from './showTicket.routes' ;
import { updatedRouter } from "./updateTicket.routes";
import { NotFoundError } from "@hdozdev/common";

const app = express();

app.use(newRouter);
app.use(showRouter);
app.use(updatedRouter);

app.all('*', async(req, res) => {
  throw new NotFoundError();
}); 
 
export {
  app as routes 
};