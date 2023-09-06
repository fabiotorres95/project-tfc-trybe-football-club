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

  public async findAll() {
    const dbData = await this.match.findAll({
      include: [
        {
          model: this.teams, as: 'homeTeam', attributes: { exclude: ['id'] },
        }, {
          model: this.teams, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });

    return MatchModel.formatToIMatch(dbData as unknown as IMatchWithTeams[]);
  }

  private async getTeam(id: number) {
    const dbData = await this.teams.findByPk(id);
    if (dbData) {
      const { teamName } = dbData;
      return teamName;
    }

    return null;
  }

  public async findAllWithTeamNames() {
    const matchesData = await this.findAll();
    const result = matchesData.map(async (match) => {
      const oldMatch = match;
      const newMatch: IMatchWithTeams = { ...oldMatch,
        homeTeam: { teamName: ' ' },
        awayTeam: { teamName: ' ' } };

      const homeTeamName = await this.getTeam(match.homeTeamId);
      if (homeTeamName !== null) {
        newMatch.homeTeam = { teamName: homeTeamName };
      } else newMatch.homeTeam = { teamName: ' ' };
      const awayTeamName = await this.getTeam(match.awayTeamId);
      if (awayTeamName) {
        newMatch.awayTeam = { teamName: awayTeamName };
      } else newMatch.awayTeam = { teamName: ' ' };

      return newMatch;
    });

    return result;
  }
}
