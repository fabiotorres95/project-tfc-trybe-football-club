import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const response = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
