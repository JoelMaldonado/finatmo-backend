import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ServiceModule } from 'src/services/service.module';

@Module({
  imports: [UserModule, ServiceModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
