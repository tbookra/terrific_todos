import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from 'src/schemas/Todos.schema';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Todos.name,
        schema: TodosSchema,
      },
    ]),
  ],
  providers: [TodosService],
})
export class TodosModule {}
