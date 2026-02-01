import { config } from './core/config'
import { createApp } from './core/http/app'
import { mongoClient } from './core/database/mongo'

const bootstrap = async () => {
  await mongoClient.connect()

  const app = createApp()
  app.listen(config.port, () => {
    process.stdout.write(`backend listening on :${config.port}\n`)
  })
}

bootstrap().catch((err) => {
  process.stderr.write(String(err) + '\n')
  process.exit(1)
})
