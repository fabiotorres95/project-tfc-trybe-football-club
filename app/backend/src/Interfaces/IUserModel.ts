import IUser from './IUser';

export interface IUserModel {
  findUser(data: Partial<IUser>): Promise<IUser | null>
}
