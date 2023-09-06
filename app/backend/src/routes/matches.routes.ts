import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  Validations.checkToken,
  (req: Request, res: Response) => matchController.patchMatchToFinished(req, res),
);

router.patch(
  '/:id',
  Validations.checkToken,
  (req: Request, res: Response) => matchController.patchMatch(req, res),
);

export default router;
