import { Request, Response, NextFunction } from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error'

const userValidationResult = () => {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters')
  ]
}; 

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if(errors.isEmpty()){
    return next();
  }

  if(!errors.isEmpty()){
    throw new RequestValidationError(errors.array());
    
  }


  // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  // return res.status(400).json({
  //   errors: extractedErrors
  // });

  // const error = new Error('Usuario o contraseña invalido');


};

export {userValidationResult, validate};