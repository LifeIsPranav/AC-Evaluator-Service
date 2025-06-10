import express, { Express } from 'express'
import serverConfig from './config/server.config'

const app: Express = express()

app.get('/', (_, res) => {
  res.send("hello")
})

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started on http://localhost:${serverConfig.PORT}`)
})