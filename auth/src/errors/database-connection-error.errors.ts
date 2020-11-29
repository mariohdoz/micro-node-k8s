import { CustomError } from './custom-error.errors';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error al conectarse a la base de datos!';

  constructor() {
    super('Error conecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(){
    return [
      { message: this.reason }
    ];
  }
}
