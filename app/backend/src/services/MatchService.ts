import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<object>> {
    const data = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data };
  }
}
