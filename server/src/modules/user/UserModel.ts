//

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Schema } from 'inspector'
import { ModelFromSchemaDefinition } from '../../types/mongoose'

const definition = {
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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

export type IUser = ModelFromSchemaDefinition<typeof definition> & mongoose.Document

const Schema = new mongoose.Schema(definition, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  collection: 'user',
})

Schema.pre<IUser>('save', function (next) {
  // Hash the password
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password)
  }

  return next()
})

Schema.methods = {
  authenticate (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password)
  },
  encryptPassword (password) {
    return bcrypt.hashSync(password, 8)
  },
}

export default mongoose.model<IUser>('User', Schema)
