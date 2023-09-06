import IMatchWithTeams from './IMatchWithTeams';
import IMatch from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>
  findAllWithTeamNames(): Promise<Promise<IMatchWithTeams>[]>
}
