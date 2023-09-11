import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getHomeLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHomeLeaderboard();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAwayLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAwayLeaderboard();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(status)).json(data);
  }
}
