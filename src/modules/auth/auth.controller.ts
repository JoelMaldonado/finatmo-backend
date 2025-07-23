import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from 'src/model/dto/auth.dto';
import { BaseResponseDto } from 'src/model/dto/base-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const res = await this.authService.login(dto);
    return new BaseResponseDto(res, 'Login successful');
  }
}
