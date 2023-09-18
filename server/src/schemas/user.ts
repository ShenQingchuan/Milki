import { Schema, model } from 'mongoose'
import type { InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
})

export type IUserSchema = InferSchemaType<typeof userSchema>
export const User = model('User', userSchema)
