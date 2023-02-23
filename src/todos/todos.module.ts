import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { TodosService } from "./todos.service"
import { TodosResolver } from "./todos.resolver"

import { Todo, TodoSchema } from "../schemas/todo.schema"
import { Insertion, InsertionSchema } from "../schemas/insertion.schema"

import { InsertionsService } from "../insertions/insertions.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: Insertion.name, schema: InsertionSchema },
    ]),
  ],
  providers: [TodosService, TodosResolver, InsertionsService],
})
export class TodosModule {}
