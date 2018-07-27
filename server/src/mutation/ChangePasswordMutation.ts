import { GraphQLString, GraphQLNonNull, GraphQLFieldConfigMap } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import UserType from '../modules/user/UserType'
import { UserLoader } from '../loader'
import { GraphQLContext } from '../TypeDefinition'
import { UserDocument } from '../modules/user/UserModel'

type InputFields = {
  oldPassword: string;
  password: string;
}

type OutputFields = {
  error?: string | null;
  me?: UserDocument | null;
}

export default mutationWithClientMutationId({
  name: 'ChangePassword',
  inputFields: {
    oldPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user new password',
    },
  },
  mutateAndGetPayload: async (
    { oldPassword, password }: InputFields,
    { user }: GraphQLContext,
  ): Promise<OutputFields> => {
    if (!user) {
      throw new Error('invalid user')
    }

    const correctPassword = user.authenticate(oldPassword)

    if (!correctPassword) {
      return {
        error: 'INVALID_PASSWORD',
      }
    }

    user.password = password
    await user.save()

    return {
      error: null,
    }
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    me: {
      type: UserType,
      resolve: (obj, args, context) => UserLoader.load(context, context.user.id),
    },
  } as GraphQLFieldConfigMap<OutputFields, GraphQLContext>,
})
