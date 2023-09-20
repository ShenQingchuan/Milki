import { Schema, model } from 'mongoose'
import type { InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false,
    default: '',
  },
}, {
  timestamps: true,
})

export type IUserSchema = InferSchemaType<typeof userSchema>
export const UserModel = model('User', userSchema)
