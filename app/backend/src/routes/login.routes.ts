import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();
const validations = new Validations();

const router = Router();

router.post(
  '/',
  Validations.hasEmailAndPassword,
  Validations.emailAndPasswordFormats,
  (req: Request, res: Response) => userController.postLogin(req, res),
);

router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => validations.checkToken(req, res, next),
);

export default router;
