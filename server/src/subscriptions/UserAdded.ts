import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';
import UserConnection from '../modules/user/UserConnection';

import pubSub, { EVENTS } from '../pubSub';

const UserAddedPayloadType = new GraphQLObjectType({
  name: 'UserAddedPayload',
  fields: () => ({
    userEdge: {
      type: UserConnection.edgeType,
      resolve: ({ user }) => {
        // TODO - figure it out how to get loaders from subscription context
        return {
          cursor: offsetToCursor(user.id),
          node: user,
        };
      },
    },
  }),
});

const userAdded = {
  type: UserAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.USER.ADDED),
};

export default userAdded;
