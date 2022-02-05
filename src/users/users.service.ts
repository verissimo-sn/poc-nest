import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): void {
    const user = new User();

    const password = hashSync(createUserDto.password, 8);

    Object.assign(user, {
      ...createUserDto,
      password,
    });

    this.users.push(user);
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
