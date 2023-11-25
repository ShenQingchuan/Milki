import type { Elysia } from 'elysia'
import { connect } from 'mongoose'

export function connectMongo(app: Elysia) {
  return app.onStart(async () => {
    const dbURL = Bun.env.MILKI_DATABASE_URL
    console.log('Connecting to MongoDB - ', dbURL ?? '')
    if (dbURL) {
      try {
        await connect(dbURL, {
          // ... Connection options
          connectTimeoutMS: 10e3,
        })
        console.log('Connected to MongoDB - milki')
      }
      catch (err) {
        console.error('Failed to connect to MongoDB')
        console.error(err)
      }
    }
  })
}
