import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

export interface IUpdateTask extends UpdateTaskDto {
  done: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(userId: string, { name, description }: CreateTaskDto): Task {
    const task = new Task();

    Object.assign(task, {
      user_id: userId,
      name,
      description,
    });

    this.tasks.push(task);

    return task;
  }

  findAll(userId: string): Task[] {
    const tasks = this.tasks.filter((task) => task.user_id === userId);
    return tasks;
  }

  findOne(userId: string, id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (task.user_id !== userId) {
      throw new UnauthorizedException('User unauthorized');
    }

    return task;
  }

  update(
    userId: string,
    id: string,
    { name, description, done }: IUpdateTask,
  ): Task {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index > 0) {
      throw new BadRequestException('Task not found');
    }

    const task = this.tasks[index];

    if (task.user_id !== userId) {
      throw new UnauthorizedException('User unauthorized');
    }

    const updatedTask = {
      ...task,
      name,
      description,
      done: done === true ? done : false,
    };

    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  remove(userId: string, id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index > 0) {
      throw new BadRequestException('Task not found');
    }

    const task = this.tasks[index];

    if (task.user_id !== userId) {
      throw new UnauthorizedException('User unauthorized');
    }

    this.tasks.splice(index, 1);
  }
}
