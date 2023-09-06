import IMatch from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>
  finishMatch(id: number): object
}
