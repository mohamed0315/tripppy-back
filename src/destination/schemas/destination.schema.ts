import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Destination & Document;

@Schema()
export class Destination {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true })
  latitude?: string;

  @Prop({ required: true })
  longitude?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
