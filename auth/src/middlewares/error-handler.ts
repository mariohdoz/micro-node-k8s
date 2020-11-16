import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from  '../errors/request-validation-error';
import { DatabaseConnectionError } from  '../errors/database-connection-error';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  const aux_err = err;

  if (err instanceof RequestValidationError ) {

    const formattedErros = err.errors.map(error => {
      return {
        message: error.msg,
        field: error.param
      };
    }) 

    return res.status(400).send({errorssss: formattedErros});
  }

  if (err instanceof DatabaseConnectionError) {
    
    return res.status(500).send({errors: [{message: err.reason}] });

  }

  res.status(400)
    .send({
      message: 'Un error imprevisto ha ocurrido',
      error: aux_err.message
    });

};

export { errorHandler }