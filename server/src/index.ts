import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const typeDefs = `#graphql
  type Widget {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    widgets: [Widget!]!
  }

  type Mutation {
    createWidget(title: String!, description: String): Widget!
  }

  type Mutation {
  deleteWidget(id: Int!): Widget!
}

type Mutation {
  updateWidget(id: Int!, title: String, description: String): Widget!
}
`

const resolvers = {
  Query: {
    widgets: () => prisma.widget.findMany(),
  },

  Mutation: {
    createWidget: (_: any, args: any) => {
      return prisma.widget.create({
        data: args,
      })
    },

    updateWidget: (_: any, args: any) => {
      return prisma.widget.update({
        where: { id: Number(args.id) },
        data: {
          title: args.title,
          description: args.description,
        },
      })
    },

    deleteWidget: async (_: any, args: { id: number | string }) => {
      const id = Number(args.id)

      try {
        return await prisma.widget.delete({
          where: { id },
        })
      } catch (err) {
        console.error("Delete failed:", err)
        throw err
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}

start()