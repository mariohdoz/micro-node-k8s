import { Router } from 'express';
import { userController } from "../controllers/index.controller";
import { currentUser } from "../middlewares/index.middlewares";

const router = Router();

router.get('/api/users/currentuser', currentUser, userController.getCurrentUser);

export {router as currentUserRouter};