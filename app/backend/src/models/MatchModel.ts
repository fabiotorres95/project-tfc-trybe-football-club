import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import IMatchWithTeams from '../Interfaces/IMatchWithTeams';

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
}
