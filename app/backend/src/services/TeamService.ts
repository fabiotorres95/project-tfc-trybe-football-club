import { ITeamModel } from '../Interfaces/ITeamModel';
import ITeam from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getOneTeam(id: number): Promise<ServiceResponse<ITeam>> {
    const oneTeam = await this.teamModel.findById(id);
    if (oneTeam === null) {
      return { status: 'NOT_FOUND',
        data: {
          message: `id ${id} not found!`,
        } };
    }

    return { status: 'SUCCESSFUL', data: oneTeam };
  }
}
