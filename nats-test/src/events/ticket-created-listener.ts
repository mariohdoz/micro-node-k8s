import { listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

class TicketCreatedListener extends listener<TicketCreatedEvent> {
  
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = 'payments-service';
  
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);
    msg.ack();
  }

}

export {
  TicketCreatedListener
}