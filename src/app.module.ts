import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TodosModule } from "./todos/todos.module"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/todos"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      installSubscriptionHandlers: true,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
