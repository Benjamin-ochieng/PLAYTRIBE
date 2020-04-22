import { merge } from 'lodash'
import dotenv from 'dotenv'
import devConfig from './dev'
import testConfig from './test'

dotenv.config()
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'test',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '7d',
  },
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig
    break
  case 'test':
  case 'testing':
    envConfig = testConfig
    break
  default:
    envConfig = devConfig
}

export default merge(baseConfig, envConfig)
