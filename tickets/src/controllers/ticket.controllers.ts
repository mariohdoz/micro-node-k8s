import { Request, Response } from 'express';
import { Ticket } from "../models/index.models";

import { NotFoundError } from "@hdozdev/common";

const createTicket = async (req: Request, res: Response): Promise<void> => {
  
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

const showTicket = async (req: Request, res: Response): Promise<void> => {
  
  const ticker_id = req.params.id;

  const ticket = await Ticket.findById(ticker_id);

  if(!ticket){
    throw new NotFoundError();
  }

  res.status(200)
    .send(
      ticket
    );

}

export {
  createTicket,
  showTicket
}