import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('loan_movement_types')
export class LoanMovementType {
  @PrimaryColumn({ type: 'tinyint' })
  id: number; // 1 = loan, 2 = payment

  @Column({ length: 50 })
  name: string;
}
