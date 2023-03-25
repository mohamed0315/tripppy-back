import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Destination } from '../../destination/schemas/destination.schema';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  destination: Destination;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
