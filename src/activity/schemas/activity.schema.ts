import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
