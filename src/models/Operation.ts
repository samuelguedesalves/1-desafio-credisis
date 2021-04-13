import {Entity} from "typeorm";

@Entity()
export class Operation {
  id: string
  account_fk: string
  debit: string
  credit: string
  launch_type: string
  description: string
  system: string
  created_at: Date;
  updated_at: Date;
}
