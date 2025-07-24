import { LoanMovement } from '../entities/loan-movement.entity';

export class LoanMovementResponseDto {
  movementId: number;
  typeId: number;
  amount: number;
  description: string;
  date: Date;
  evidenceUrl: string | null;

  static fromEntity(entity: LoanMovement): LoanMovementResponseDto {
    const dto = new LoanMovementResponseDto();
    dto.movementId = entity.id;
    dto.typeId = entity.type.id;
    dto.amount = Number(entity.amount);
    dto.description = entity.description;
    dto.date = entity.date;
    dto.evidenceUrl = entity.evidenceUrl;
    return dto;
  }

  static fromList(entities: LoanMovement[]): LoanMovementResponseDto[] {
    return entities.map((entity) => LoanMovementResponseDto.fromEntity(entity));
  }
}
