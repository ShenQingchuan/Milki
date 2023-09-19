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
})

export type IUserSchema = InferSchemaType<typeof userSchema>
export const UserModel = model('User', userSchema)
