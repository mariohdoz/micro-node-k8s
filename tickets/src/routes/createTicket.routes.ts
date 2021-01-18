import { Router } from 'express';
import { ticketController } from "../controllers/index.controllers";
import { requiereAuth } from "@hdozdev/common";

const router = Router();

router.post('/api/tickets', requiereAuth, ticketController.createTicket);

export {router as newRouter};