import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signAuthToken(payload: IAuthTokenJwt) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN')!;
    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: `${expiresIn}s`
    });
    return {
      token,
      expiresIn: parseInt(expiresIn, 10),
    };
  }

  async getAuthToken(token: string): Promise<IAuthTokenJwt> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      return this.jwtService.verifyAsync<IAuthTokenJwt>(token, {
        secret: secret,
      });
    } catch (err) {
      throw new UnauthorizedException('Token de acceso inválido o expirado');
    }
  }
}

export interface IAuthTokenJwt {
  id: number;
  name: string;
}
