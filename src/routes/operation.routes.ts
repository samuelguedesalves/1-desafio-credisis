import { Router } from 'express';

const operationRoutes = Router();

// debit
// credit

operationRoutes.post('/debit', (request, response) => {
  const {
    destination_account,
    value,
    description,
    system
  } = request.body;

  const accountId = request.accountId;



  return response.status(200).json({ ok: true });
})

operationRoutes.post('/credit', (request, response) => {
  return response.status(200).json({ ok: true });
})

export default operationRoutes;
