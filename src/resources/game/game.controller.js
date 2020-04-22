import { crudControllers } from '../../utils/crud'
import { Game } from './game.model'

// eslint-disable-next-line import/prefer-default-export
export const gameController = crudControllers(Game)
