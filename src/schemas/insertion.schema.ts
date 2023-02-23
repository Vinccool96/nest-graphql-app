import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema()
export class Insertion {
  _id: string

  @Prop()
  lastInsert: string
}

export type InsertionDocument = HydratedDocument<Insertion>

export const InsertionSchema = SchemaFactory.createForClass(Insertion)
