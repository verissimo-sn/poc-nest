import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongooseSchema.Types.ObjectId })
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type userDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
