import { Elysia } from 'elysia'
import { setupHomePage } from './configs/homepage'
import { connectMongo } from './database'
import { apiVersion1 } from './routers/api-v1'

const app = new Elysia()
  .use(apiVersion1)
  .use(setupHomePage)
  .use(connectMongo)
  .listen(Number(Bun.env.PORT ?? '7611'))

console.log(
  `Milki is running at http://${
    app.server?.hostname
  }:${app.server?.port}`,
)
