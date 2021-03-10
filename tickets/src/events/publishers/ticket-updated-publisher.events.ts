import { Publisher, Subjects, TicketUpdatedEvent } from "@hdozdev/common";

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

export {
  TicketUpdatedPublisher
} 