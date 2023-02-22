import { Field, InputType } from "@nestjs/graphql"
import { IsOptional } from "class-validator"

@InputType({ description: "Passed to createTodo to create a new todo" })
export class TodoInput {
  @Field({ description: "Is it done already?" })
  @IsOptional()
  done?: boolean

  @Field({ description: "The body text" })
  text: string
}
