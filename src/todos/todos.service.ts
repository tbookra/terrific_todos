import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todos } from 'src/schemas/Todos.schema';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateStatusDto } from './dto/UpdateStatus.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todos.name) private todosModel: Model<Todos>) {}

  createNewTodo(createTodo: CreateTodoDto) {
    const newTodo = new this.todosModel(createTodo);
    return newTodo.save();
  }
  getAllTodos() {
    return this.todosModel.find();
  }
  getTodoById(id: string) {
    return this.todosModel.findById(id);
  }
  async updateTodo(id: string, updateStatusDto: UpdateStatusDto) {
    const updatedTodo = await this.todosModel.findByIdAndUpdate(
      id,
      updateStatusDto,
      {
        new: true,
      },
    );
    if (!updatedTodo) throw new HttpException('task not found', 404);
    return updatedTodo;
  }

  deleteTodo(id: string) {
    return this.todosModel.findByIdAndDelete(id);
  }
}
