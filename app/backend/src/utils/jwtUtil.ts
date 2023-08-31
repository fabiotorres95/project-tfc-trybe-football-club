import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

const secret = process.env.JWT_SECRET || 'segredaço';

type PayloadData = Omit<IUser, 'password'>;

function sign(payload: PayloadData): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string) : PayloadData {
  const data = jwt.verify(token, secret) as PayloadData;
  return data;
}

export default {
  sign,
  verify,
};
