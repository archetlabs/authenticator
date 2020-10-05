
export const typeDefs = `
type Query {
  _authenticate: String
}

type Mutation {
  authenticate(username: String!, password: String!): authentication!
  refresh_authentication(token: String!): authentication!
}

type authentication {
  token: String
  success: Boolean!
}

`

export default typeDefs
