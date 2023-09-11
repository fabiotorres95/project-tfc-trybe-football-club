import IMatch from './IMatch';
import IMatchWithTeams from './IMatchWithTeams';
import NewMatch from './NewMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatchWithTeams[]>
  finishMatch(id: number): Promise<object>
  editMatch(id: number, data: Partial<IMatchWithTeams>): Promise<object>
  addNewMatch(data: NewMatch): Promise<IMatch>
}
