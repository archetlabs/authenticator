export const HASURA_GRAPHQL_HTTP_ENDPOINT       = process.env.HASURA_GRAPHQL_HTTP_ENDPOINT
export const HASURA_GRAPHQL_WEBSOCKET_ENDPOINT  = process.env.HASURA_GRAPHQL_WEBSOCKET_ENDPOINT
export const HASURA_GRAPHQL_ADMIN_SECRET        = process.env.HASURA_GRAPHQL_ADMIN_SECRET
export const HASURA_GRAPHQL_JWT_SECRET          = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET || '{}')
export const USER_TABLE                         = process.env.USER_TABLE || 'user'
export const USERNAME_FIELD                     = process.env.USERNAME_FIELD || 'email'
export const USER_FIELDS                        = process.env.USER_FIELDS ? process.env.USER_FIELDS.split(',') : []

export const PORT                               = process.env.PORT || 80
