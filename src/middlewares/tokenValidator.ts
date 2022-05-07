//un middleware nos evita repetir codigo y ejecuta codigo entre llamadas
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

const MISSING_AUTH_MSG = "Missing authorization header"

export default function tokenValidator() {
  return function(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    //si no viene el token, no esta autorizado
    if(!authHeader){
      res.status(401).json({ message: MISSING_AUTH_MSG })
      return
    }
    //Desestructuración de array 
    const [bearer, token] = authHeader.split(' ')

    if(bearer !== 'Bearer') {
      res.status(401).json({ message: MISSING_AUTH_MSG})
      return
    }

    try {
      const tokenPayload = verifyToken(token)
      req.user = tokenPayload
    } catch {
      res.status(401).json({ message: MISSING_AUTH_MSG })
      return
    }

    return next()

  }
}