import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService, IUpdateTask } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    const { userId } = req.user;
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  findAll(@Req() req) {
    const { userId } = req.user;

    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const { userId } = req.user;

    return this.tasksService.findOne(userId, id);
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Query() updateTaskDto: IUpdateTask,
  ) {
    const { userId } = req.user;

    return this.tasksService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const { userId } = req.user;

    return this.tasksService.remove(userId, id);
  }
}
