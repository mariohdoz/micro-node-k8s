import { Request, Response, NextFunction } from 'express';
import { CustomError } from  '../errors/custom-error.errors';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  const aux_err = err;

  if (err instanceof CustomError ) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  res.status(400)
    .send({
      message: 'Un error imprevisto ha ocurrido',
      error: aux_err.message
    });

};

export { errorHandler }