import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export interface ILoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const payload = { sub: user.id, username: user.name };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }
}
