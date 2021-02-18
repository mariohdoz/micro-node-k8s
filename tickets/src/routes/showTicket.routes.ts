import { Router } from "express";
import { ticketController } from "../controllers/index.controllers";

const router = Router();

router.get('/api/tickets/:id', ticketController.showTicket);
router.get('/api/tickets', ticketController.listTickets);

export {
  router as showRouter
} 