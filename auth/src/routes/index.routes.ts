import express = require('express');
import {currentUserRouter} from './current-user.routes';
import {signRouter} from './sign.routes';

const app = express();

// Ruta para obtener el usuario
app.use(currentUserRouter);

// Ruta para login
app.use(signRouter);
 
export {
  app as routes 
};