import { Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error'; 

export function getCurrentUser(req: Request, res: Response) {
  res.send('hi there!');
}

export function postsignIn(req: Request, res: Response) {
  res.send('hi there!!');
}

export function postsignOut(req: Request, res: Response) {
  res.send('hi there!!!');
}

export function postsignUp(req: Request, res: Response) {
  
  const {email, password} = req.body;

  console.log('Error conectando la base de datos');
  throw new DatabaseConnectionError();
  
  res.send('hi there!!!!');
  
}
