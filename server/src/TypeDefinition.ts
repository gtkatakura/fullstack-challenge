import { UserDocument } from './modules/user/UserModel'
import { DataLoaders } from './loader/types'

export type GraphQLContext = {
  user?: UserDocument;
  dataloaders: DataLoaders;
}
