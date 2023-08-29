import { NewEntity } from '../Interfaces';
import IUser from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findUser(data: NewEntity<IUser>): Promise<IUser | null> {
    const [dbData] = await this.model.findAll({ where: { email: data.email } });

    if (!dbData) return null;

    const { id, username, role, email, password }: IUser = dbData;
    return { id, username, role, email, password };
  }
}
