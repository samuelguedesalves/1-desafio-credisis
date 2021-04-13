import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Account from '../models/Account';
import config from '../config';

interface Request {
  username: string;
  password: string;
  cpf: string;
  phone: string;
  email: string;
}

interface Response {
  account: Omit<Account, 'password'>;
  token: string;
}

export default async function createAccountService ({
  username,
  password,
  cpf,
  phone,
  email
}: Request): Promise<Response> {
  const accountRepository = getRepository(Account);

  const heshedPassword = await bcrypt.hash(password, 8);

  const account = accountRepository.create({
    balance: 0.00,
    code: ( Date.now() + ((Math.random()*100000).toFixed()) ),
    username,
    password: heshedPassword,
    cpf,
    phone,
    email,
  });

  await accountRepository.save(account);

  const token = jwt.sign({ id: account.id }, config.api_secret, { expiresIn: '24h' } );

  const { password: pass, ...accountWithoutPass } = account;

  return {
    account: accountWithoutPass,
    token
  };
}
