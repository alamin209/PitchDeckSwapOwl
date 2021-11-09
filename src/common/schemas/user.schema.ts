import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  nickName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  regDate: Date;

  @Prop({ default: 1 })
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
