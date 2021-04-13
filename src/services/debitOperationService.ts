import { getRepository } from 'typeorm';
import Operation from '../models/Operation';
import Account from '../models/Account';
import ApiError from '../utils/ApiError';

interface Request {
  accountId: string;
  destination_account: string;
  value: number;
  description: string;
  system: string;
}

export default async function debitOperationService ({
  accountId,
  destination_account,
  value,
  description,
  system,
}: Request) {

  const operationRepository = getRepository(Operation);
  const accountRepository = getRepository(Account);

  const account = await accountRepository.findOne({ where: { id: accountId } });

  if( !account ) {
    throw new ApiError("internal server error", 500);
  }

  if( account.balance < value ) {
    throw new ApiError("you don't have sufficiently money to this transaction", 400);
  }

  const destinationAccount = await accountRepository
    .findOne({
      where: { code: destination_account }
    });

  if(!destinationAccount){
    throw new ApiError("destination account not exist", 400);
  }

  account.balance = ( account.balance - value );
  await accountRepository.save(account);

  destinationAccount.balance = ( destinationAccount.balance + value );
  await accountRepository.save(destinationAccount);

  const operation = operationRepository.create({
    account_fk: accountId,
    destination_account_fk: destinationAccount.id,
    debit: value,
    credit: 0,
    description,
    system,
  });

  return operation;
}

// account_fk
// debit
// credit
// launch_type
// description
// system
