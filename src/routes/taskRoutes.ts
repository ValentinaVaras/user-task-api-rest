import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRoutes = Router()
const controller = new TaskController

/* Asignamos cada acción de CRUD a cada una de las rutas, con la raiz traemos todas las rutas */
taskRoutes.get('/', controller.getAll)
taskRoutes.get('/:id', controller.getById)
taskRoutes.post('/', controller.create)
taskRoutes.put('/:id', controller.update)
taskRoutes.delete('/:id', controller.delete)

export default taskRoutes