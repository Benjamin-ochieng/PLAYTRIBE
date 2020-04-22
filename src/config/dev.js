import dotenv from 'dotenv'

dotenv.config()

const devConfig = {
  secrets: {
    jwt: process.env.JWT,
  },
  dbUrl: process.env.DEV_DBURL,
}

export default devConfig
