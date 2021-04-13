import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import Account from '../models/Account'

interface Request {
  username: string;
  password: string;
  cpf: string;
  phone: string;
  email: string;
}

export default async function createAccountService ({
  username,
  password,
  cpf,
  phone,
  email
}: Request): Promise<Account> {
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

  return account;
}
