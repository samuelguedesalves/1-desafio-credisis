import { Router } from 'express';

import accountRoutes from './account.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/user', accountRoutes);
routes.use('/auth', authRoutes);

export default routes;
