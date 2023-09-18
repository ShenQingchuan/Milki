import { Elysia } from 'elysia'
import { setupHomePage } from './configs/homepage'
import { connectMongo } from './database'

const app = new Elysia()
  .use(setupHomePage)
  .use(connectMongo)
  .listen(Number(Bun.env.PORT ?? '7611'))

console.log(
  `Milki is running at http://${
    app.server?.hostname
  }:${app.server?.port}`,
)
