import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  done: boolean;
}
