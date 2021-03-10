import { Publisher, Subjects, TicketCreatedEvent } from "@hdozdev/common";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export {
  TicketCreatedPublisher
}