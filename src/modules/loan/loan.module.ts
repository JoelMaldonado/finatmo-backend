import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanMovementType } from 'src/model/entities/loan-movement-type.entity';
import { LoanMovement } from 'src/model/entities/loan-movement.entity';
import { Loan } from 'src/model/entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, LoanMovementType, LoanMovement])],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
