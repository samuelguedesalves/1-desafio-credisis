import { Router } from 'express';
import ApiError from '../errors/ApiError';
import authAccountService from '../services/authAccountService'

const authRoutes = Router();

// AUTH ACCOUNT
authRoutes.post('/', async (request, response) => {
  try {
    const { cpf, password } = request.body;

    if(!cpf || !password) {
      throw new ApiError('missing param in request', 400);
    }

    const { account, token } = await authAccountService({ cpf, password });

    return response.status(200).json({ account, token });

  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
});

export default authRoutes;
