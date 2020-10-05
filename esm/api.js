import _ from 'lodash'
import jwt from 'jsonwebtoken'
import gql from 'graphql-tag'
import bcrypt from 'bcryptjs'
import { makeHasuraClient } from '@archet/client'

import {
  HASURA_GRAPHQL_HTTP_ENDPOINT,
  HASURA_GRAPHQL_WEBSOCKET_ENDPOINT,
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_JWT_SECRET,
  USERNAME_FIELD,
  USER_TABLE,
  USER_FIELDS,
} from './config'

const client = makeHasuraClient({
  webSocketUri: HASURA_GRAPHQL_WEBSOCKET_ENDPOINT,
  httpUri: HASURA_GRAPHQL_HTTP_ENDPOINT,
  adminSecret: HASURA_GRAPHQL_ADMIN_SECRET,
})

export const getUserGraphQL = async (username) => {
  const { data: { [USER_TABLE]: [user] } } = await client.query({
    query: gql`
      query getUser($username: String!) {
        ${USER_TABLE}(where: { ${USERNAME_FIELD}: { _eq: $username } }, limit: 1) {
          id
          role
          password
          ${USER_FIELDS.join('\n')}
        }
      }
    `,
    variables: {
      username,
    },
  })
  return user
}

export const authenticateUserGraphQL = async (args, options) => {
  const user = await getUserGraphQL(args.username, options)
  if (!user) return null
  const passwordEquality = await bcrypt.compare(args.password, user.password)
  if (!passwordEquality) return null

  const customClaims = _.fromPairs(USER_FIELDS.map(field => [
    'x-hasura-' + field.replace('_', '-'),
    String(user[field]),
  ]))

  return jwt.sign({
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [user.role],
      'x-hasura-default-role': user.role,
      'x-hasura-user-id': String(user.id),
      ...customClaims,
    },
  }, HASURA_GRAPHQL_JWT_SECRET['key'])
}
