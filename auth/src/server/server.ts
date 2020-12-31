import express from 'express';
const app = express();

import * as bodyParser from 'body-parser';
import cookieSession from "cookie-session";

import { routes } from '../routes/index.routes';
import { errorHandler } from '@hdozdev/common';

app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  }
));

app.use(routes);
app.use(errorHandler);

export { app };