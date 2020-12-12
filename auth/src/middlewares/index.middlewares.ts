// import { CreateUserValidationResult, LoginUserValidationResult, validate } from './validator';
import * as validator from './validator.middlewares';
import { errorHandler } from './error-handler.middlewares';
import { currentUser } from './current-user.middlewares';
import { requiereAuth } from './require-auth.middlewares';

export {
  validator,
  errorHandler,
  currentUser,
  requiereAuth
}