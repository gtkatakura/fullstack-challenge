import { GraphQLFieldConfigMap } from 'graphql'
import { GraphQLContext } from '../../TypeDefinition'

export type EmailMutationOutputFields = {
  token?: string | null;
  error?: string | null;
}

export type EmailMutationOutputFieldsConfigMap = GraphQLFieldConfigMap<EmailMutationOutputFields, GraphQLContext>
