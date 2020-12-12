import { Request, Response, NextFunction } from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error.errors'

const CreateUserValidationResult = () => {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters'),
    body('name').isLength({min: 1, max: 25}).withMessage('Name must be provided')
  ]
}; 

const LoginUserValidationResult = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password must be provide'),
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

};

export {CreateUserValidationResult, LoginUserValidationResult, validate};