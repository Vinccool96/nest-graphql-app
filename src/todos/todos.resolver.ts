import { Args, ID, Query, Resolver } from "@nestjs/graphql"

import { TodosService } from "./todos.service"
import { Todo } from "./todos.model"
import { TodoInput } from "./dto/todo.input"

@Resolver((_of: void) => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((_returns) => Todo)
  async todo(@Args("id", { type: () => ID }) id: string): Promise<Todo> {
    const todo = await this.todosService.findOne(id)

    return {
      id: todo._id,
      done: todo.done,
      text: todo.text,
    }
  }

  async createTodo(@Args("todo") todo: TodoInput): Promise<Todo> {
    const res = await this.todosService.create(todo)

    return {
      id: res._id,
      done: res.done,
      text: res.text,
    }
  }
}
