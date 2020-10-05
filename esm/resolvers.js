import { authenticateUserGraphQL } from './api'

export const resolvers = {
  Query: {
    _authenticate: async (root, args, context, info) => { return '' },
  },
  Mutation: {
    authenticate: async (root, args, context, info) => {
      const token = await authenticateUserGraphQL(args)
      return ({ token, success: !!token })
    },
    refresh_authentication: async (root, args, context, info) => {
      const token = await authenticateUserGraphQL(args)
      return ({ token, success: !!token })
    },

  }
}

export default resolvers
