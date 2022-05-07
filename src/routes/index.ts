import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import authRoutes from './authRoutes'
import healthRoutes from './healthRoutes'
import taskRoutes from './taskRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
//manda todas las rutas que pasen porla al controlador ./healtRoutes.ts 
apiRoutes.use('/task', taskRoutes)

apiRoutes.use('/tasks', tokenValidator(), taskRoutes)
apiRoutes.use('/auth', authRoutes)

export default apiRoutes

