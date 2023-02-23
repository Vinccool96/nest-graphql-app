import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql"

import { TodosService } from "./todos.service"
import { Todo } from "./todos.model"
import { TodoInput } from "./dto/todo.input"
import { InsertionsService } from "../insertions/insertions.service"

@Resolver((_of: void) => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService, private readonly insertionsService: InsertionsService) {}

  @Query((_returns) => Todo, { nullable: true })
  async todo(@Args("id", { type: () => ID }) id: string): Promise<Todo | null> {
    const todo = await this.todosService.findOne(id)

    if (todo === null) {
      return null
    }

    return {
      id: todo._id,
      done: todo.done,
      text: todo.text,
    }
  }

  @Query((_returns) => Todo, { nullable: true })
  async lastTodo(): Promise<Todo | null> {
    const lastId = await this.insertionsService.lastInsertionId()

    if (lastId === null) {
      return null
    }

    const lastTodo = await this.todosService.findOne(lastId)

    if (lastTodo === null) {
      return null
    }

    return {
      id: lastTodo._id,
      done: lastTodo.done,
      text: lastTodo.text,
    }
  }

  @Query((_returns) => [Todo])
  async todos(): Promise<Array<Todo>> {
    const todos = await this.todosService.findAll()

    return todos.map((todo) => ({ id: todo._id, done: todo.done, text: todo.text }))
  }

  @Mutation((_returns) => Todo)
  async createTodo(@Args("todo") todo: TodoInput): Promise<Todo> {
    const res = await this.todosService.create(todo)
    await this.insertionsService.insertion(res._id)

    return {
      id: res._id,
      done: res.done,
      text: res.text,
    }
  }

  @Mutation((_returns) => Todo, { nullable: true })
  async updateTodo(@Args("id", { type: () => ID }) id: string, @Args("todo") todo: TodoInput): Promise<Todo | null> {
    const res = await this.todosService.update(id, todo)

    if (res === null) {
      return null
    }

    return {
      id: res._id,
      done: res.done,
      text: res.text,
    }
  }

  @Mutation((_returns) => Todo, { nullable: true })
  async deleteTodo(@Args("id", { type: () => ID }) id: string): Promise<Todo | null> {
    const todo = await this.todosService.delete(id)

    if (todo === null) {
      return null
    }

    return {
      id: todo._id,
      done: todo.done,
      text: todo.text,
    }
  }
}
