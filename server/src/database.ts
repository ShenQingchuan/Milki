import type { Elysia } from 'elysia'
import { connect } from 'mongoose'

export function connectMongo(app: Elysia) {
  return app.onStart(async () => {
    const dbURL = Bun.env.MILKI_DATABASE_URL
    if (dbURL) {
      try {
        await connect(dbURL, {
          // ... Connection options
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
