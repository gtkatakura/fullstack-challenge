//

import * as jwt from 'jsonwebtoken'
import { User } from './model'
import { jwtSecret } from './config'
import { UserDocument } from './modules/user/UserModel'

type Token = {
  id: string;
}

export async function getUser (token?: string) {
  if (!token) return { user: null }

  try {
    const decodedToken = jwt.verify(token.substring(4), jwtSecret) as Token

    const user = await User.findOne({ _id: decodedToken.id })

    return {
      user,
    }
  } catch (err) {
    return { user: null }
  }
}

export function generateToken (user: UserDocument) {
  return `JWT ${jwt.sign({ id: user._id } as Token, jwtSecret)}`
}
