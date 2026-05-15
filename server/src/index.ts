import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const typeDefs = `#graphql
  type Widget {
    id: ID!
    title: String!
    description: String
    order: Int!
  }

  type Query {
    widgets: [Widget!]!
  }

  type Mutation {
    createWidget(title: String!, description: String): Widget!
    deleteWidget(id: Int!): Widget!
    updateWidget(id: Int!, title: String, description: String, order: Int): Widget!
    reorderWidgets(ids: [ID!]!): [Widget!]!
}
`

const resolvers = {
  Query: {
    widgets: () =>
      prisma.widget.findMany({
        orderBy: {
          order: "asc",
        },
      }),
  },

  Mutation: {
    reorderWidgets: async (_: any, args: { ids: string[] }) => {
      const updates = args.ids.map((id, index) =>
        prisma.widget.update({
          where: { id: Number(id) },
          data: { order: index },
        })
      )

      const updated = await Promise.all(updates)

      return updated
    },

    createWidget: async (_: any, args: any) => {
      const maxOrder = await prisma.widget.aggregate({
        _max: {
          order: true,
        },
      })
      return prisma.widget.create({
        data: {
          title: args.title,
          description: args.description,
          order: (maxOrder._max.order ?? 0) + 1,
        },
      })
    },

    updateWidget: (_: any, args: any) => {
      return prisma.widget.update({
        where: { id: Number(args.id) },
        data: {
          title: args.title,
          description: args.description,
          order: args.order,
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