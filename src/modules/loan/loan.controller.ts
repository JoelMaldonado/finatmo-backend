import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanMovementResponseDto } from 'src/model/dto/loan.dto';
import { AuthGuard } from 'src/guards/auth/token.guard';
import { Request } from 'express';
import { Constants } from 'src/config/constants';
import { IAuthTokenJwt } from 'src/services/token.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    const user: IAuthTokenJwt = request[Constants.user];
    return this.loanService.findAll(user.id);
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
