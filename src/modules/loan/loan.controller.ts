import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
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
import { BaseResponseDto } from 'src/model/dto/base-response.dto';

@UseGuards(AuthGuard)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async findAll(@Req() request: Request) {
    const user: IAuthTokenJwt = request[Constants.user];
    const res = await this.loanService.findAll(user.id);
    return new BaseResponseDto(res);
  }

  @Post()
  async createLoan(
    @Req() request: Request,
    @Body('name') name: string,
    @Body('notes') notes?: string,
  ) {
    const user: IAuthTokenJwt = request[Constants.user];
    const res = await this.loanService.createLoan(user.id, name, notes);
    return new BaseResponseDto(res.id);
  }

  @Get('movements')
  async findAllMovements(
    @Query('loanId', ParseIntPipe) loanId: number,
    @Query('typeId') typeId?: number,
  ) {
    const res = await this.loanService.findAllMovements(loanId, typeId);
    return new BaseResponseDto(LoanMovementResponseDto.fromList(res));
  }

  @Post('movements')
  async createMovement(
    @Body('loanId', ParseIntPipe) loanId: number,
    @Body('typeId', ParseIntPipe) typeId: number,
    @Body('amount') amount: number,
    @Body('description') description?: string,
    @Body('evidenceUrl') evidenceUrl?: string,
  ) {
    const res = await this.loanService.createMovement(
      loanId,
      typeId,
      amount,
      description,
      evidenceUrl,
    );

    return new BaseResponseDto(res.id);
  }
}
