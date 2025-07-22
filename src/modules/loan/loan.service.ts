import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanMovementResponseDto } from 'src/model/dto/loan.dto';
import { LoanMovementType } from 'src/model/entities/loan-movement-type.entity';
import { LoanMovement } from 'src/model/entities/loan-movement.entity';
import { Loan } from 'src/model/entities/loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    @InjectRepository(LoanMovementType)
    private readonly loanMovementTypeRepository: Repository<LoanMovementType>,

    @InjectRepository(LoanMovement)
    private readonly loanMovementRepository: Repository<LoanMovement>,
  ) {}

  async findAll(userId: number) {
    const loans = await this.loanRepository.find({
      where: {
        user: { id: userId },
      },
    });
    const listMap = loans.map((loan) => ({
      loanId: loan.id,
      name: loan.name,
      notes: loan.notes,
    }));
    return listMap;
  }

  async findAllMovements(loanId: number, typeId?: number) {
    const movements = await this.loanMovementRepository.find({
      where: {
        loan: { id: loanId },
        ...(typeId && { type: { id: typeId } }),
      },
      relations: {
        type: true,
      },
    });

    return movements;
  }
}
