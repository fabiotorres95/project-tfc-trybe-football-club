import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/IUser';
import { NewEntity } from '../Interfaces';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/IUserModel';

import bcryptUtil from '../utils/bcryptUtil';
import jwtUtil from '../utils/jwtUtil';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async postLogin(user: NewEntity<IUser>): Promise<ServiceResponse<object>> {
    const dbUser = await this.userModel.findUser(user);

    if (!dbUser) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }

    const isTokenCorrect = await bcryptUtil.verify(user.password, dbUser.password);

    if (!isTokenCorrect) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }

    const { id, username, role, email } = dbUser;
    const token = jwtUtil.sign({ id, username, role, email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(token: string): Promise<ServiceResponse<object>> {
    const user = jwtUtil.verify(token);
    if (!user) {
      return { status: 'INVALID_DATA', data: { message: 'Token must be a valid token' } };
    }

    const { username, role, email } = user;
    const dbUser = await this.userModel.findUser({ username, role, email });
    if (!dbUser) {
      return { status: 'INVALID_DATA', data: { message: 'Token must be a valid token' } };
    }

    return { status: 'SUCCESSFUL', data: { role: dbUser.role } };
  }
}
