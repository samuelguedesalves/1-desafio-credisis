import { Router } from 'express';
import ApiError from '../utils/ApiError';

import createAccountService from '../services/createAccountService';

const accountRoutes = Router();

// CREATE A ACCOUNT
accountRoutes.post('/', async (request, response) => {
  try {
    const {
      username,
      password,
      cpf,
      phone,
      email
    } = request.body;

    if( !username || !password || !cpf || !phone || !email ) {
      throw new ApiError('missing param in request', 400);
    }

    const { account, token } = await createAccountService({
      username,
      password,
      cpf,
      phone,
      email
    });

    return response.status(200).json({ account, token });
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

export default accountRoutes;
