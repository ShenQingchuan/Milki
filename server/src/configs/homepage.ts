import { html } from '@elysiajs/html'
import type Elysia from 'elysia'

export function setupHomePage(app: Elysia) {
  return app
    .use(html())
    .get('/', () => /* html */`
    <html data-theme="system">
      <head>
        <title>Milki API</title>
        <link rel="stylesheet" href="https://unpkg.com/poc.css" />
      </head>
      <body>
        <div style="
          width: 100vw; height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
        ">
          <h1>🏕️ Milki API</h1>
          <blockquote>
            Hi, Here's the homepage of Milki API. <br>
            Nothing you can do here.
          </blockquote>
        </div>
      </body>
    </html>
  `)
}
