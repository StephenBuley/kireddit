import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core"
import mikroOrmConfig from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"

const main = async () =>  {
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getMigrator().up()

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
        context: () => ({ em: orm.em})
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("server started at localhost:4000")
    })
}

main()