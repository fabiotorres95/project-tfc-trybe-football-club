import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined || (inProgress !== 'true' && inProgress !== 'false')) {
      const response = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    let inProgressBool;
    if (inProgress === 'true') {
      inProgressBool = true;
    }
    if (inProgress === 'false') {
      inProgressBool = false;
    }

    const response = await this.matchService.getAllMatches(inProgressBool);
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async patchMatchToFinished(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchService.patchMatchToFinished(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    const bodyData = req.body;

    const { status, data } = await this.matchService.patchMatch(Number(id), bodyData);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async postNewMatch(req: Request, res: Response) {
    const bodyData = req.body;

    const { status, data } = await this.matchService.postNewMatch(bodyData);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
