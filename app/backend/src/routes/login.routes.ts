import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.hasEmailAndPassword,
  Validations.emailAndPasswordFormats,
  (req: Request, res: Response) => userController.postLogin(req, res),
);

export default router;
