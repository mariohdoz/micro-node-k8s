import { Router } from 'express';
import { userController } from "../controllers/index.controller";

const router = Router();

router.get('/api/users/currentuser', userController.getCurrentUser);

export {router as currentUserRouter};