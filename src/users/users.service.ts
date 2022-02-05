import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Callie Meyer',
      email: 'tubi@wehet.hr',
      password: 'senha123',
    },
    {
      id: 2,
      name: 'Caleb Swanson',
      email: 'olzehu@ufaumaep.jp',
      password: 'senha123',
    },
    {
      id: 3,
      name: 'Eugenia Jennings',
      email: 'logmuc@hegalug.us',
      password: 'senha123',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
