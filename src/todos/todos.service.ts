import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { Todo, TodoDocument } from "../schemas/todo.schema"
import { TodoInput } from "./dto/todo.input"

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec()
  }

  async findOne(id: string): Promise<Todo | null> {
    return await this.todoModel.findOne({ _id: id }).exec()
  }

  async delete(id: string): Promise<Todo | null> {
    return await this.todoModel.findByIdAndRemove({ _id: id }).exec()
  }

  async create(todo: TodoInput): Promise<Todo> {
    return await this.todoModel.create(todo)
  }
}
