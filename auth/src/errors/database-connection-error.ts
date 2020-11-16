import { ValidationError } from 'express-validator';

class DatabaseConnectionError extends Error {

  reason = 'Error al conectarse a la base de datos!';

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

}

export { DatabaseConnectionError }