import { UserDocument } from './modules/user/UserModel'
import DataLoader from 'dataloader'

export type Dataloaders = {
  UserLoader: DataLoader<string, UserDocument>;
  [name: string]: DataLoader<string, any>;
}

export type GraphQLContext = {
  user?: UserDocument;
  dataloaders: Dataloaders;
}
