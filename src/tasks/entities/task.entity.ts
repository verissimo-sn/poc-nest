import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: mongooseSchema.Types.ObjectId })
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  done: boolean;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export type taskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
