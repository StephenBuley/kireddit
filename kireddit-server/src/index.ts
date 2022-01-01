import { MikroORM } from "@mikro-orm/core"
import mikroOrmConfig from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const main = async () =>  {
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getMigrator().up()

    const app = express()

    app.get('/', (_, res) => {
        res.send("hello")
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("server started at localhost:4000")
    })
}

main()