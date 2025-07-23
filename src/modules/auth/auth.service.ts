import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from 'src/model/dto/auth.dto';
import { UserService } from '../user/user.service';
import { IAuthTokenJwt, TokenService } from 'src/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(dto: LoginRequestDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (dto.password !== user.password) {
      throw new UnauthorizedException(
        `Invalid credentials for user with email ${dto.email}`,
      );
    }
    const payload: IAuthTokenJwt = {
      id: user.id,
      name: user.name,
    };
    const token = await this.tokenService.signAuthToken(payload);
    return {
      user: {
        name: user.name,
      },
      accessToken: token,
      refreshToken: token,
    };
  }
}
