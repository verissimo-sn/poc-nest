import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create({ name, description }: CreateTaskDto): Task {
    const task = new Task();

    Object.assign(task, {
      name,
      description,
    });

    this.tasks.push(task);

    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, { name, description }: UpdateTaskDto): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    this.tasks[index] = {
      ...this.tasks[index],
      name,
      description,
    };
  }

  updateStatus(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id);

    const updatedTask = {
      ...this.tasks[index],
      done: !this.tasks[index].done,
    };

    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    this.tasks.splice(index, 1);
  }
}
