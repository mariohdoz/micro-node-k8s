import { Request, Response } from 'express';
import { verify } from "../helpers/jwt.helpers";

const getCurrentUser = (req: Request, res: Response) => {

  if(!req.session?.jwt){
    return res.status(400).send({
      currentUser: null
    })
  }

  const payload = verify(req.session.jwt, process.env.JWT_KEY!);

  res.status(200).send({ currentUser: payload });
}

export {getCurrentUser}