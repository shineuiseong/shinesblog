import config from '../config/index.js'
import mongoose from 'mongoose'
import logger from './logger.js'
export default (app) => {
  // configure mongoose(MongoDB)
  const dbname = config.databaseName
  if (process.env.NODE_ENV !== 'test') {
    const connection = mongoose.connect(
      config.databaseURL,
      {
        dbName: 'bo',
        useNewUrlParser: true,
        autoIndex: false,
      },
      (error) => {
        if (error) {
          console.log('몽고디비 연결 에러', error)
          logger.error('MongoDB ERROR')
        } else {
          logger.info('MongoDB Connected')
        }
      }
    )
  }
}
