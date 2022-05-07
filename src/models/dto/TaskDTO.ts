/* DTO data transfer object, son contratos. Define como la data deberia venir y como la devuelvo
Hay que hacer varios DTOs porque para ciertos entradas de datos van a haber datos opcionales y en otras obligatorios*/

interface BaseTaskDTO {
  id?: number
  title: string
  content: string
  done: boolean
}

/* Modela la RESPUESTA de la API */
export interface TaskDTO extends BaseTaskDTO {
  id: number
  userId: number | null
}

/* Contrato para la creación de una task */
export interface CreateTaskDTO extends BaseTaskDTO {}

/* Con Partial se cambian los atributos de obligatorios a NO obligatorios */
export interface UpdateTaskDTO extends Partial<BaseTaskDTO>{}
