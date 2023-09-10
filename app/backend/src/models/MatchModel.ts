import NewMatch from '../Interfaces/NewMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import IMatchWithTeams from '../Interfaces/IMatchWithTeams';
import IMatch from '../Interfaces/IMatch';

export default class MatchModel implements IMatchModel {
  private match = SequelizeMatch;
  private teams = SequelizeTeam;

  private static formatToIMatch(data: IMatchWithTeams[]) {
    const result = data.map((match) => {
      const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
        homeTeam, awayTeam } = match;

      return { id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
        homeTeam,
        awayTeam,
      };
    });

    return result;
  }

  public async findAll(inProgress?: boolean) {
    const dbData = await this.match.findAll({
      include: [
        {
          model: this.teams, as: 'homeTeam', attributes: { exclude: ['id'] },
        }, {
          model: this.teams, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });

    let result = MatchModel.formatToIMatch(dbData as unknown as IMatchWithTeams[]);

    if (inProgress === true) {
      result = result.filter((match) => match.inProgress === true);
    }

    if (inProgress === false) {
      result = result.filter((match) => match.inProgress === false);
    }

    return result;
  }

  public async finishMatch(id: number) {
    const data = { inProgress: false };
    await this.match.update(data, { where: { id } });

    return { message: 'Finished' };
  }

  public async editMatch(id: number, data: Partial<IMatchWithTeams>) {
    await this.match.update(data, { where: { id } });

    return { message: `Match ${id} edited successfully` };
  }

  public async addNewMatch(data: NewMatch): Promise<IMatch> {
    const dbData = await this.match.create({ ...data, inProgress: true });

    const { id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = dbData;

    return { id, homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress };
  }
}
