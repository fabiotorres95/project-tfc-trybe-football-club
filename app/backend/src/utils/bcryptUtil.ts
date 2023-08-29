import * as bcrypt from 'bcryptjs';

function sign(password: string) : string {
  const token = bcrypt.hashSync(password);

  return token;
}

function verify(password: string, hash: string): boolean {
  const result = bcrypt.compareSync(password, hash);

  return result;
}

export default {
  sign,
  verify,
};
