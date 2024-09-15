import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateStatusDto } from './dto/UpdateStatus.dto';
import mongoose from 'mongoose';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log('createTodoDto', createTodoDto);
    return this.todosService.createNewTodo(createTodoDto);
  }

  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalid id', 400);
    return this.todosService.updateTodo(id, updateStatusDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalid id', 400);
    const deletedTask = await this.todosService.deleteTodo(id);
    if (!deletedTask) throw new HttpException('task was not found', 404);
    return;
  }
}
