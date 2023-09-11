import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamStats from '../Interfaces/TeamStats';
import IMatchWithTeams from '../Interfaces/IMatchWithTeams';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import ITeam from '../Interfaces/ITeam';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getHomeLeaderboard(): Promise<ServiceResponse<object>> {
    const inProgress = false;
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(inProgress);

    const list = teams.map((team) => {
      const teamHomeMatches = matches.filter((match) => match.homeTeamId === team.id);

      const homeStats = LeaderboardService.teamHomeStats(team, teamHomeMatches);
      return homeStats;
    });

    let data = list.sort((a, b) => b.goalsFavor - a.goalsFavor);
    data = list.sort((a, b) => b.goalsBalance - a.goalsBalance);
    data = list.sort((a, b) => b.totalVictories - a.totalVictories);
    data = list.sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'SUCCESSFUL', data };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<object>> {
    const inProgress = false;
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(inProgress);

    const list = teams.map((team) => {
      const teamAwayMatches = matches.filter((match) => match.awayTeamId === team.id);

      const awayStats = LeaderboardService.teamAwayStats(team, teamAwayMatches);
      return awayStats;
    });

    let data = list.sort((a, b) => b.goalsFavor - a.goalsFavor);
    data = list.sort((a, b) => b.goalsBalance - a.goalsBalance);
    data = list.sort((a, b) => b.totalVictories - a.totalVictories);
    data = list.sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'SUCCESSFUL', data };
  }

  public async getLeaderboard(): Promise<ServiceResponse<object>> {
    const inProgress = false;
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(inProgress);

    const list = teams.map((team) => {
      const teamHomeMatches = matches.filter((match) => match.homeTeamId === team.id);
      const teamAwayMatches = matches.filter((match) => match.awayTeamId === team.id);

      const homeStats = LeaderboardService.teamHomeStats(team, teamHomeMatches);
      const awayStats = LeaderboardService.teamAwayStats(team, teamAwayMatches);
      const allStats = LeaderboardService.teamStats(homeStats, awayStats);
      return allStats;
    });

    let data = list.sort((a, b) => b.goalsFavor - a.goalsFavor);
    data = list.sort((a, b) => b.goalsBalance - a.goalsBalance);
    data = list.sort((a, b) => b.totalVictories - a.totalVictories);
    data = list.sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'SUCCESSFUL', data };
  }

  private static teamHomeStats(team: ITeam, teamHomeMatches: IMatchWithTeams[]) {
    const name = team.teamName;
    const totalGames = teamHomeMatches.length;
    const totalVictories = teamHomeMatches.filter((m) => m.homeTeamGoals > m.awayTeamGoals).length;
    const totalDraws = teamHomeMatches.filter((m) => m.homeTeamGoals === m.awayTeamGoals).length;
    const totalLosses = teamHomeMatches.filter((m) => m.homeTeamGoals < m.awayTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = teamHomeMatches.map((m) => m.homeTeamGoals).reduce((a, b) => a + b);
    const goalsOwn = teamHomeMatches.map((m) => m.awayTeamGoals).reduce((a, b) => a + b);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const p1 = { name, totalPoints, totalGames, totalVictories, totalDraws };
    const p2 = { totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
    return { ...p1, ...p2 };
  }

  private static teamAwayStats(team: ITeam, teamAwayMatches: IMatchWithTeams[]) {
    const name = team.teamName;
    const totalGames = teamAwayMatches.length;
    const totalVictories = teamAwayMatches.filter((m) => m.awayTeamGoals > m.homeTeamGoals).length;
    const totalDraws = teamAwayMatches.filter((m) => m.awayTeamGoals === m.homeTeamGoals).length;
    const totalLosses = teamAwayMatches.filter((m) => m.awayTeamGoals < m.homeTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = teamAwayMatches.map((m) => m.awayTeamGoals).reduce((a, b) => a + b);
    const goalsOwn = teamAwayMatches.map((m) => m.homeTeamGoals).reduce((a, b) => a + b);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const p1 = { name, totalPoints, totalGames, totalVictories, totalDraws };
    const p2 = { totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
    return { ...p1, ...p2 };
  }

  private static teamStats(hs: TeamStats, as: TeamStats) {
    const { name } = hs;
    const totalPoints = hs.totalPoints + as.totalPoints;
    const totalGames = hs.totalGames + as.totalGames;
    const totalVictories = hs.totalVictories + as.totalVictories;
    const totalDraws = hs.totalDraws + as.totalDraws;
    const totalLosses = hs.totalLosses + as.totalLosses;
    const goalsFavor = hs.goalsFavor + as.goalsFavor;
    const goalsOwn = hs.goalsOwn + as.goalsOwn;
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const p1 = { name, totalPoints, totalGames, totalVictories, totalDraws };
    const p2 = { totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
    return { ...p1, ...p2 };
  }
}
