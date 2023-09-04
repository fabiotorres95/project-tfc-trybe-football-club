import IMatchWithTeams from './IMatchWithTeams';
import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findAllWithTeamNames(): Promise<Promise<IMatchWithTeams>[]>
}
