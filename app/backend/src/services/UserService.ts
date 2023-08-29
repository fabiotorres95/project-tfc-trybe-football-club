import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/IUser';
import { NewEntity } from '../Interfaces';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/IUserModel';

import sign from '../utils/bcryptUtil';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async postLogin(user: NewEntity<IUser>): Promise<ServiceResponse<object>> {
    const dbUser = await this.userModel.findUser(user);

    const token = sign(dbUser);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
