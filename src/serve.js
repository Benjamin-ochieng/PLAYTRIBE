import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { connectDb } from './utils/db'
import config from './config'
import gameRouter from './resources/game/game.router'
import { signUp, signIn, protect } from './utils/auth'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/signup', signUp)
app.use('/api', protect)
app.use('/signin', signIn)
app.use('/api/games', gameRouter)

// eslint-disable-next-line import/prefer-default-export
export const main = () => {
  try {
    connectDb()
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`)
    })
  } catch (err) {
    console.error(err)
  }
}
