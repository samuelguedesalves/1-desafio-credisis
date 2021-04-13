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
  debit: string;

  @Column()
  credit: string;

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
