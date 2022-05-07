import { Request, Response } from "express"
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
import { UserTokenPayLoad } from "../models/dto/userDTO"
import TaskRepository from "../models/repositories/TaskRepository"
import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"


//usa el taskDTO
export default class TaskController{
  public readonly getAll = async (req: Request, res: Response) => {
    const user = req.user as UserTokenPayLoad
    const repository = new TaskRepository(user.sub)
    
    try{
    const task: TaskDTO[] = await repository.findAll()
    res.json(task)
    }catch (error){
      if(error.code === 'P2002'){
        res.status(409).json({ message: 'User already exists' })
        return
      }
      console.log(error)
      console.log('Error code: ',error.code)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
  
  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.user as UserTokenPayLoad
    const repository = new TaskRepository(user.sub)
    
    try{
    const task = await repository.findById(parseInt(id)) 

    if (!task){
      res.status(404).json({ message: 'Tarea no encontrada'})
      return
    }
    res.json(task)
  }catch (error){
    if(error.code === 'P2002'){
      res.status(409).json({ message: 'User already exists' })
      return
    }
    console.log(error)
    console.log('Error code: ',error.code)
    res.status(500).json({ message: 'Something went wrong' })
   }
  }
  
  public readonly create = async (req: Request, res: Response) => {
      const task = req.body as CreateTaskDTO

      try {
        await createTaskSchema.validateAsync(task)
      } catch(error) {
        res.status(400).json({ message: error.message})
        return
      }

      const user = req.user as UserTokenPayLoad
      const repository = new TaskRepository(user.sub)

      try{
      const newTask = await repository.create(task)

      res.json({newTask})
      }catch(error) {
        if(error.code === 'P2002'){
          res.status(409).json({ message: 'Task already exists' })
          return
        }
        console.log(error)
        console.log('Error code: ',error.code)
        res.status(500).json({ message: 'Something went wrong' })
      } 
    }
  
  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const task = req.body as UpdateTaskDTO
    
    try {
      await updateTaskSchema.validateAsync(task)
    } catch(error) {
      res.status(400).json({ message: error.message})
      return
    }
    const user = req.user as UserTokenPayLoad
   
    const repository = new TaskRepository(user.sub)
   
    try{
    await repository.update(parseInt(id), task)
    
    res.sendStatus(204) //204, todo ok pero no devuelvo nada en el body
    } catch (error){
      if(error.code === 'P2002'){
        res.status(409).json({ message: 'User already exists' })
        return
      }
      console.log(error)
      console.log('Error code: ',error.code)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
  
  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = req.user as UserTokenPayLoad
    const repository = new TaskRepository(user.sub)

    try{
    await repository.delete(parseInt(id))
    res.sendStatus(204)
  }catch (error){
    if(error.code === 'P2002'){
      res.status(409).json({ message: 'User already exists' })
      return
    }
    console.log(error)
    console.log('Error code: ',error.code)
    res.status(500).json({ message: 'Something went wrong' })
  }
 }
}