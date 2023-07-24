import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Accommodation } from '../../accommodation/schemas/accommodation.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Accommodation' }] })
  accommodations: Accommodation[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false })
  dateNaiss?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
