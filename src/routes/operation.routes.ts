import { Router } from 'express';
import debitOperationService from '../services/debitOperationService';
import listOperationsService from '../services/listOperationsService';

const operationRoutes = Router();

// CREATE A OPERATION
operationRoutes.post('/debit', async (request, response) => {
  try {
    const {
      destination_account,
      value,
      description,
      system
    } = request.body;

    const accountId = request.accountId;

    const operation = await debitOperationService({
      accountId,
      destination_account,
      value,
      description,
      system,
    })

    return response.status(200).json({ operation });
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

// LIST OPERATIONS
operationRoutes.get('/', async (request, response) => {
  try {
    const accountId = request.accountId;

    const operations = await listOperationsService(accountId);

    return response.status(200).json(operations);
  } catch (error) {
    return response.status(error.status).json({ error: error.message });
  }
})

export default operationRoutes;
