import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<object>> {
    let data;

    if (inProgress !== undefined) {
      data = await this.matchModel.findAll(inProgress);
    } else {
      data = await this.matchModel.findAll();
    }

    return { status: 'SUCCESSFUL', data };
  }

  public async patchMatchToFinished(id: number) {
    const data = await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data };
  }

  public async patchMatch(id: number, bodyData: object) {
    const data = await this.matchModel.editMatch(id, bodyData);

    return { status: 'SUCCESSFUL', data };
  }
}
