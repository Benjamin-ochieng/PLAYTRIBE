import jwt from 'jsonwebtoken'
import config from '../config'
import { User } from '../resources/user/user.model'

const createToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

const setCookies = (res, token) => {
  // const cookies = []
  const [header, payload, signature] = token.split('.')
  res.cookie('signedToken', `${header}.${signature}`, {
    // domain: "",
    secure: true,
    httpOnly: true,
    sameSite: true,
  })

  res.cookie('token', `${payload}`, {
    // domain: "",
    secure: true,
    httpOnly: true,
    sameSite: true,
  })
}

export const signUp = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res.status(400).send({ message: 'email and password are required' })
  try {
    const user = await User.create({ email, password })
    const token = createToken(user)
    setCookies(res, token)
    res.status(200).send({ message: 'You are signed up!' })
  } catch (err) {
    res.status(409).send({ Error: 'Email address already in use' })
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res.status(400).end({ message: 'email and password are required' })
  try {
    const user = await User.findOne({ email })
    if (!user) res.status(401).send({ message: 'Invalid username or password' })
    const authorizedUser = await user.checkPassword(password)
    if (!authorizedUser) {
      res.status(401).send({ message: 'Invalid username or password' })
    } else {
      const token = createToken(user)
      setCookies(res, token)
      res.status(200).send({ message: 'Signed In' })
    }
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export const protect = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    res.status(401).send({ message: 'email and password are required' })
  } else {
    try {
      const token = header.split(' ')[1]
      console.log(token)
      const payload = await verifyToken(token)
      const user = await User.findOne({ _id: payload.id })
        .select('-password')
        .lean()
        .exec()
      req.user = user
      next()
    } catch (err) {
      console.error(err)
      res.status(500).send({
        message: `you don't have permission.  Please log in or sign up`,
      })
    }
  }
}
