import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema()
export class Todo {
  _id: string

  @Prop({ isRequired: true })
  done: boolean

  @Prop({ isRequired: true })
  text: string
}

export type TodoDocument = HydratedDocument<Todo>

export const TodoSchema = SchemaFactory.createForClass(Todo)
