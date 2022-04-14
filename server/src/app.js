import config from './config/index.js'
import express from 'express'
import logger from './loaders/logger.js'
import loaders from './loaders/index.js'

const app = express()

loaders(app)

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
