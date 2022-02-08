import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

export interface ILoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.validate(email, password);

    const payload = { sub: user._id, username: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User or password incorrect');
    }

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('User or password incorrect');
    }

    return user;
  }
}
