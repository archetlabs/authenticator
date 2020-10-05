import { makeHasuraRemoteServer } from '@archet/server'

import { PORT } from './config'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

makeHasuraRemoteServer({
  port: PORT,
  typeDefs,
  resolvers,
})

console.log(`authentication provider started.`)
