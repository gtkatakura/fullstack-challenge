//
import { GraphQLObjectType } from 'graphql'
import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { GraphQLContext } from '../TypeDefinition'

const registeredTypes = {} as {
  [propertyName: string]: GraphQLObjectType;
}

export function registerType (type: GraphQLObjectType) {
  registeredTypes[type.name] = type
  return type
}

export const { nodeField, nodeInterface } = nodeDefinitions<GraphQLContext>((globalId, context) => {
  const { type, id } = fromGlobalId(globalId)
  const loader = context.dataloaders[`${type}Loader`]
  return (loader && loader.load(id)) || null
}, object => registeredTypes[object.constructor.name] || null)
