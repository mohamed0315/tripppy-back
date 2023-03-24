import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Destination } from '../../destination/schemas/destination.schema';

export type AccommodationDocument = Accommodation & Document;

@Schema()
export class Accommodation {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  destination: Destination;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  isAvailable: boolean;

  @Prop({ required: false })
  images?: string[];

  @Prop({ required: false })
  createdAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const AccommodationSchema = SchemaFactory.createForClass(Accommodation);
