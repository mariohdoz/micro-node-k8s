import { Request, Response } from 'express';

const getCurrentUser = (req: Request, res: Response) => {

  const currentUser = req.currentUser; 

  res.status(200).send({ currentUser: currentUser || null });
}

export {getCurrentUser}