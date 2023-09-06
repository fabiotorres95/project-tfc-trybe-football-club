import IMatch from './IMatch';
import IMatchWithTeams from './IMatchWithTeams';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<object>
  editMatch(id: number, data: Partial<IMatchWithTeams>): Promise<object>
}
