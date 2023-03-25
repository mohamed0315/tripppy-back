import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Accommodation } from '../../accommodation/schemas/accommodation.schema';
import { Activity } from "../../activity/schemas/activity.schema";

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
  zipcode: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Accommodation' }] })
  accommodations: Accommodation[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Activity' }] })
  activities: Activity[];

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false })
  latitude?: string;

  @Prop({ required: false })
  longitude?: string;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
