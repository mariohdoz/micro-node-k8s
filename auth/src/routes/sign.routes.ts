import { Router } from 'express';
import { authController } from "../controllers/index.controllers";
import { Validator } from '@hdozdev/common'; 

const router = Router();

router.post('/api/users/signout', authController.postsignOut)

router.post('/api/users/signin', Validator.LoginUserValidationResult(), Validator.validate, authController.postsignIn);

router.post('/api/users/signup', Validator.CreateUserValidationResult(), Validator.validate, authController.postsignUp);

export {router as signRouter};