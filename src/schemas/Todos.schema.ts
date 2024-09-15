import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todos {
  @Prop({ required: true })
  todo: string;

  @Prop({ default: false, required: false })
  done: boolean;
}

export const TodosSchema = SchemaFactory.createForClass(Todos);
