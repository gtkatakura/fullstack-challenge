//
import { GraphQLString, GraphQLNonNull, GraphQLFieldConfigMap } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { User } from '../model'
import { generateToken } from '../auth'
import { EmailMutationOutputFields, EmailMutationOutputFieldsConfigMap } from './types/EmailMutation'

type InputFields = {
  email: string;
  password: string;
}

export default mutationWithClientMutationId({
  name: 'LoginEmail',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }: InputFields): Promise<EmailMutationOutputFields> => {
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return {
        token: null,
        error: 'INVALID_EMAIL_PASSWORD',
      }
    }

    const correctPassword = user.authenticate(password)

    if (!correctPassword) {
      return {
        token: null,
        error: 'INVALID_EMAIL_PASSWORD',
      }
    }

    return {
      token: generateToken(user),
      error: null,
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  } as EmailMutationOutputFieldsConfigMap,
})
