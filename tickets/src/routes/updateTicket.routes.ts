import { Router } from 'express';
import { requiereAuth, Validate } from "@hdozdev/common";
import { body } from "express-validator";
import { ticketController } from "../controllers/index.controllers";

const router = Router();

router.put('/api/tickets/:id', requiereAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').not().isEmpty().isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0'),
], Validate.validateRequest, ticketController.updateTicket);

export {
  router as updatedRouter
}