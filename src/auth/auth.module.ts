import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret_token,
      signOptions: { expiresIn: jwtConstants.expires_in_token },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
