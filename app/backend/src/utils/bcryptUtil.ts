import * as bcrypt from 'bcryptjs';

async function sign(password: string) : Promise<string> {
  const token = await bcrypt.hash(password, 'segredaço');

  return token;
}

async function verify(password: string, hash: string): Promise<boolean> {
  const result = await bcrypt.compare(password, hash);

  return result;
}

export default {
  sign,
  verify,
};
