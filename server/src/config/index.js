import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

export default {
  server_port: process.env.PORT,

  /*  MonogoDB URL */
  databaseURL: process.env.MONGODB_URI,

  /* JWT Secret */
  jwtSecretKey: process.env.JWT_SECRET_KEY,

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  issuer: 'euiseong',

  databaseName: process.env.MONGODB_DBNAME,
  googleClientID: process.env.GOOGLE_CLIENT_ID,

  S3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  S3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  S3BucketName: process.env.S3_BUCKET_NAME,
  S3BucketRegion: process.env.S3_BUCKET_REGION,
}
