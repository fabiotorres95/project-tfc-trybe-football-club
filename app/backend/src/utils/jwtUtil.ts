import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

const secret = process.env.JWT_SECRET || 'segredaço';

type PayloadData = Partial<IUser>;

function sign(payload: PayloadData): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string) : PayloadData | string {
  try {
    const data = jwt.verify(token, secret);
    if (typeof data === 'string' || !data.id || !data.role) return 'Token must be a valid token';

    const { id, role } = data;

    return { id, role };
  } catch (_err) {
    return 'Token must be a valid token';
  }
}

export default {
  sign,
  verify,
};
