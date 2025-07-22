import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Loan } from './loan.entity';
import { LoanMovement } from './loan-movement.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToMany(() => LoanMovement, (movement) => movement.user)
  loanMovements: LoanMovement[];

  // Si usás transacciones:
  // @OneToMany(() => Transaction, (tx) => tx.user)
  // transactions: Transaction[];
}
