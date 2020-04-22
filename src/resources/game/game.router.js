import { Router } from 'express'
import { gameController } from './game.controller'

const router = Router()

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(gameController.getMany)
  .post(gameController.makeOne)

router
  .route('/:id')
  .get(gameController.getOne)
  .put(gameController.updateOne)
  .delete(gameController.deleteOne)

export default router
