import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Account from '../models/Account';
import ApiError from '../utils/ApiError';
import config from '../config'


interface Request {
  cpf: string;
  password: string;
}

interface Response {
  account: Omit<Account, 'password'>;
  token: string;
}

export default async function generateTokenService ({ cpf, password }: Request): Promise<Response> {
  const accountRepository = getRepository(Account);

  const accountExists = await accountRepository.findOne({ where: { cpf } });

  if( !accountExists ) {
    throw new ApiError('this user are invalid', 404);
  }

  const comparePass = await bcrypt.compare(password, accountExists.password);

  if( comparePass ) {
    const token = await jwt.sign({ id: accountExists.id },
      config.api_secret,
      { expiresIn: '24h' });

    const  { password: ps, ...accountWithoutPassword } = accountExists;

    return {
      account: accountWithoutPassword,
      token,
    }

  } else {
    throw new ApiError("cpf and password not match", 401);
  }
}
