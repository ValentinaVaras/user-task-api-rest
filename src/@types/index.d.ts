//Archivo de definición
import http from 'http'
import { UserTokenPayLoad } from '../models/dto/userDTO'

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    user?: UserTokenPayLoad
  }

  export interface Response extends http.ServerResponse, Express.Response {
    user?: UserTokenPayLoad
  }
}
//ahora puedo pasar usuarios a travez de request