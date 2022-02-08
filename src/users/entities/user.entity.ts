import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Task, TaskSchema } from 'src/tasks/entities/task.entity';

@Schema()
export class User {
  @Prop({ type: mongooseSchema.Types.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: TaskSchema })
  task: Task[];
}

export type userDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
