import { Request, Response } from 'express';
import { Ticket } from "../models/index.models";

const createTicket = async (req: Request, res: Response) => {
  
  const {title, price} = req.body;
  
  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  });

  await ticket.save();
  
  res.status(201)
    .send({
      ticket
    });
}

export {createTicket}