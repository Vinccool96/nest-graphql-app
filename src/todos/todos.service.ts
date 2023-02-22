import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { Todo, TodoDocument } from "./schemas/todo.schema"
import { TodoInput } from "./dto/todo.input"

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec()
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id }).exec()
    if (todo === null) {
      throw new NotFoundException(`Todo with id ${id} doesn't exist`)
    }

    return todo
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndRemove({ _id: id }).exec()
    if (deletedTodo === null) {
      throw new NotFoundException(`Todo with id ${id} doesn't exist and can't be deleted`)
    }

    return deletedTodo
  }

  async create(todo: TodoInput): Promise<Todo> {
    return await this.todoModel.create(todo)
  }
}
