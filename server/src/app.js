import config from './config/index.js'
import express from 'express'
import logger from './loaders/logger.js'
import loaders from './loaders/index.js'

const app = express()

loaders(app)

const option = {
  host: '0.0.0.0',
  port: 8080,
}

const server = app
  .listen(config.server_port, () => {
    logger.info(`
    ################################################
    🛡️  Server listening on port: ${config.server_port} 🛡️
    ################################################
  `)
  })
  .on('error', (err) => {
    logger.error(err)
    process.exit(1)
  })

export default { server }
