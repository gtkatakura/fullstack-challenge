import { UserDocument } from './modules/user/UserModel'

export type GraphQLContext = {
  user?: UserDocument;
}
