//

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { ModelFromSchemaDefinition } from '../../types/mongoose'

const definition = {
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    hidden: true,
  },
  email: {
    type: String,
    required: false,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}

type ISchemaDefinition = ModelFromSchemaDefinition<typeof definition>

const methods = {
  authenticate (this: ISchemaDefinition, plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password)
  },
  encryptPassword (password: string) {
    return bcrypt.hashSync(password, 8)
  },
}

export type UserDocument = mongoose.Document & ISchemaDefinition & typeof methods

const UserSchema = new mongoose.Schema(definition, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'user',
})

UserSchema.methods = methods

UserSchema.pre<UserDocument>('save', function (next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password)
  }

  return next()
})

export default mongoose.model<UserDocument>('User', UserSchema)
