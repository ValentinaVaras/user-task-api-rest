import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../dto/TaskDTO";

const prisma = new PrismaClient()


export default class TaskRepository {
  /* Cada vez que instanciemos este repositorio, tendremos que pasarle un userId */
  private userId: number
  
  constructor(userId:number){
    this.userId = userId
  }
//NO recibe nada, retorna una promesa que es un arreglo de TaskDTO
  public readonly findAll = async (): Promise<TaskDTO[]> => {
    const tasks = await prisma.task.findMany({
     //que me traiga solo las task del user id que estoy consultando
      where: {
        userId: this.userId
      }
    })
    return tasks
  }
  //                                 recibe    :      retorna
  public readonly findById = async (id: number): Promise<TaskDTO | undefined> => {
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: this.userId
      }
    })

    if(!task) return //si task no viene retorno undefined

    return task
  }

  public readonly create = async (task:CreateTaskDTO): Promise<TaskDTO> => {
    const newTask = await prisma.task.create({
      data: {
        ...task, //spread operator
        userId: this.userId
      }
    })

    return newTask
  }

  public readonly update = async (id:number, task:UpdateTaskDTO): Promise<void> => {
    await prisma.task.updateMany({
      where: {
        //2 datos porque el usuario actualiza la tarea propia
        id,
        userId: this.userId
      },
      data: task
    })
  }

  public readonly delete = async (id:number) => {
    await prisma.task.deleteMany({
      where: {
        id,
        userId: this.userId
      }
    })
  }
}