import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

const secret = process.env.JWT_SECRET || 'segredaço';

type PayloadData = Omit<IUser, 'password'>;

function sign(payload: PayloadData): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string) : PayloadData | null {
  const data = jwt.verify(token, secret);

  if (typeof data === 'string') {
    const json = JSON.parse(data);
    if (!json.id || !json.username || !json.role || !json.email) {
      return null;
    }
    return json;
  }

  const { id, username, role, email } = data;
  if (!id || !username || !role || !email) {
    return null;
  }
  return { id, username, role, email };
}

export default {
  sign,
  verify,
};
