import { Router } from 'express';
import ApiError from '../utils/ApiError';

import createAccountService from '../services/createAccountService';

const userRoutes = Router();

//LIST USERS
userRoutes.get('/', (request, response) => {
  try {

  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

userRoutes.post('/', async (request, response) => {
  try {
    const {
      username,
      password,
      cpf,
      phone,
      email
    } = request.body;

    if( !username || !password || !cpf || !phone || !email ) {
      throw new ApiError('invalid param in request', 400);
    }

    const account = await createAccountService({
      username,
      password,
      cpf,
      phone,
      email
    });

    return response.status(200).json(account);
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

export default userRoutes;
