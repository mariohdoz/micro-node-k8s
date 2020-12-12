import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/index.errors";

const requiereAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.currentUser){
    throw new NotAuthorizedError();    
  }
  
  next();
}

export { requiereAuth }