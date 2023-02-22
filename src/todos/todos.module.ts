import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { TodosService } from "./todos.service"
import { TodosResolver } from "./todos.resolver"

import { Todo, TodoSchema } from "./schemas/todo.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
