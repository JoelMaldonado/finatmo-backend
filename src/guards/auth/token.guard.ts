import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Constants } from 'src/config/constants';
import { TokenService } from 'src/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      request[Constants.user] = await this.tokenService.getAuthToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de acceso inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      return token;
    } else {
      throw new UnauthorizedException('Sin autorización');
    }
  }
}
