import express, { Request, Response } from 'express';
import Validator from '../validators/validator';
import { invoiceGenerateSchema } from '../validators/schemas/invoice.schema';
import InvoiceController from '../controllers/invoice.controller';
import GenerateInvoiceUseCase from '../../../modules/invoice/use_case/generate_invoice/generateInvoice.usecase';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';

export const invoiceRouter = express.Router();

const invoiceRepository = new InvoiceRepository();
const generateInvoieUseCase = new GenerateInvoiceUseCase(invoiceRepository);
const controller = new InvoiceController(generateInvoieUseCase);

invoiceRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(invoiceGenerateSchema, req.body);

    const response = await controller.generate(data);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});
