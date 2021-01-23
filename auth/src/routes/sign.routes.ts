import { Router } from 'express';
import { validateRequest } from "@hdozdev/common";
import { body } from 'express-validator';
import { authController } from "../controllers/index.controllers";

const router = Router();

router.post('/api/users/signout', authController.postsignOut)

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must be provide'),
], validateRequest, authController.postsignIn);

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters'),
  body('name').isLength({min: 1, max: 25}).withMessage('Name must be provided')
], validateRequest, authController.postsignUp);

export {router as signRouter};