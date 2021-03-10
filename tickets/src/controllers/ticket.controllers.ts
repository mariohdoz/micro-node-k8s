import { Request, Response } from 'express';
import { Ticket } from "../models/index.models";
import { NotAuthorizedError, NotFoundError } from "@hdozdev/common";
import { TicketCreatedPublisher, TicketUpdatedPublisher } from "../events/index.events";
import { natsWrapper } from "../server/nats-wrapper";

const createTicket = async (req: Request, res: Response): Promise<void> => {
  
  const {title, price} = req.body;
  
  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  });

  await ticket.save();

  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId  
  });
  
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

const listTickets = async (req: Request, res: Response): Promise<void> => {
  const tickets = await Ticket.find({});
  
  res.status(200)
    .send(tickets)
}

const updateTicket = async (req: Request, res: Response) => {

  const {title, price} = req.body;  
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket){
    throw new NotFoundError();
  }

  if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  ticket.set({
    title,
    price
  });

  await ticket.save();

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId
  });

  res.send(ticket);
}

export {
  createTicket,
  showTicket,
  listTickets,
  updateTicket
}