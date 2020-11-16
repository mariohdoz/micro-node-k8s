console.log("Iniciando");
import express = require('express');
console.log('Se importa express');

import * as bodyParser from 'body-parser';
console.log('Se importa Body parser');
import { routes } from '../routes/index.routes';
import { errorHandler } from '../middlewares/error-handler';
console.log('Se importa rutas');

const PORT = 3000;
console.log("Creando instancia");
const app = express();

// parse application/x-www-form-urlencoded
console.log("Se habilita body parser")
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

console.log("Se habilitan rutas")
app.use(routes);

console.log('Se habilita manejo de errores');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}!!!`);
});