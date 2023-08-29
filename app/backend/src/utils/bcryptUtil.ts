import * as bcrypt from 'bcryptjs';
import IUser from '../Interfaces/IUser';

type TokenPayload = Omit<IUser, 'password'>;

function sign(payload: TokenPayload) : string {
  const token = bcrypt.hashSync(payload.toString());

  return token;
}

export default sign;
