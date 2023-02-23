import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "A todo" })
export class Todo {
  @Field((_type) => ID)
  id: string

  @Field({ description: "Is it done already?", nullable: true })
  done: boolean

  @Field({ description: "The body text" })
  text: string
}
