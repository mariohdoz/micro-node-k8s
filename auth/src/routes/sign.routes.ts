import { Router } from 'express';
import { authController } from "../controllers/index.controllers";
import { validator } from '../middlewares/index.middlewares'; 

const router = Router();

router.post('/api/users/signout', authController.postsignOut)

router.post('/api/users/signin', validator.LoginUserValidationResult(), validator.validate, authController.postsignIn);

router.post('/api/users/signup', validator.CreateUserValidationResult(), validator.validate, authController.postsignUp);

export {router as signRouter};