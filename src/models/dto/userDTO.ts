interface BaseUserDTO {
  email: string
  //la password no se retorna porque seria inseguro
}

export interface UserDTO extends BaseUserDTO {
  id: number
}

export interface CreateUserDTO extends BaseUserDTO {
  password: string,
  firstName: string,
  lastName:string
}

//update va a tener email y password opcionales (partial)
export type UpdateUserDTO = Partial<CreateUserDTO>


export interface LoginUserDTO extends UserDTO {
  password: string
}

//email, firstName, lastName deberían ser incluidos siempre en respuesta y escritura, password solo en escritura
//UserDTO: id, firstName, lastName, email
//CreateUserDTO: firstName, lastName, email, password
//UpdateUserDTO: Partial<CreateUserDTO>


export interface UserTokenPayLoad {
  sub: number // Subject, quien es el dueño del token 
  email: string
  exp: number
  iat: number // Fecha de creación, lo entrega la librería que estamos usando: JsonWebToken
}
