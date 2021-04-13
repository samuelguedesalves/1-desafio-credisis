import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Account from './Account';

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  account_fk: string;

  @ManyToOne(() => Account )
  @JoinColumn({ name: 'account_fk' })
  account: Account;

  @Column()
  destination_account_fk: string;

  @ManyToOne(() => Account )
  @JoinColumn({ name: 'destination_account_fk' })
  destinationAccount: Account;

  @Column()
  debit: number;

  @Column()
  credit: number;

  @Column()
  launch_type: string;

  @Column()
  description: string;

  @Column()
  system: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Operation
