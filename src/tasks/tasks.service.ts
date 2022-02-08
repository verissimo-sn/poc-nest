import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, userDocument } from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, taskDocument } from './entities/task.entity';

export interface IUpdateTask extends UpdateTaskDto {
  done: boolean;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<taskDocument>,
    @InjectModel(User.name)
    private userModel: Model<userDocument>,
  ) {}

  async create(
    userId: string,
    { name, description }: CreateTaskDto,
  ): Promise<Task> {
    const user = await this.userModel.findById(userId);

    return this.taskModel.create({
      user,
      name,
      description,
    });
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId });
  }

  async findOne(userId: string, id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (task.user.toString() !== userId) {
      throw new UnauthorizedException('User not authorized');
    }

    return task;
  }

  async update(
    userId: string,
    id: string,
    { name, description, done }: IUpdateTask,
  ): Promise<void> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { $set: { name, description, done: done ? true : false } },
    );

    if (!updatedTask) {
      throw new BadRequestException('Task not found');
    }
  }

  async remove(userId: string, id: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      throw new BadRequestException('Task not found');
    }
  }
}
