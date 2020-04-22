import mongoose from 'mongoose'
import config from '../config'

// eslint-disable-next-line import/prefer-default-export
export const connectDb = (
  url = config.dbUrl,
  options = { useFindAndModify: false, useCreateIndex: true }
) => {
  console.log('connected to mongodb')
  return mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
