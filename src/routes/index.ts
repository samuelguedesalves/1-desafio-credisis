import { Router } from 'express';

import accountRoutes from './account.routes';
import authRoutes from './auth.routes';
import operationRoutes from './operation.routes';

import authAccess from '../middlewares/authAccess'

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/auth', authRoutes);
routes.use('/operation', authAccess, operationRoutes);

export default routes;
