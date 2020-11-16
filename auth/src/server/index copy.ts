import express = require('express');
import * as bodyParser from 'body-parser';
import { routes } from '../routes/index.routes';

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

// app.get('/api/users/currentuser', (req, res) => {
//   res.send('Hi there');
// });

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}!!`);
});