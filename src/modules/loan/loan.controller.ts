import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanMovementResponseDto } from 'src/model/dto/loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  findAll(@Query('userId', ParseIntPipe) userId: number) {
    return this.loanService.findAll(userId);
  }

  @Get('movements')
  async findAllMovements(
    @Query('loanId', ParseIntPipe) loanId: number,
    @Query('typeId') typeId?: number,
  ) {
    const res = await this.loanService.findAllMovements(loanId, typeId);
    return LoanMovementResponseDto.fromList(res);
  }
}
