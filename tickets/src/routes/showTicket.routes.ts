import { Router } from "express";
import { requiereAuth, Validate } from "@hdozdev/common";
import { body } from "express-validator";
import { ticketController } from "../controllers/index.controllers";

const router = Router();

router.get('/api/tickets/:id', ticketController.showTicket);

export {
  router as showRouter
} 