import express, { Request, Response } from 'express';
import Validator from '../validators/validator';
import { invoiceGenerateSchema } from '../validators/schemas/invoice.schema';
import InvoiceController from '../controllers/invoice.controller';
import GenerateInvoiceUseCase from '../../../modules/invoice/use_case/generate_invoice/generateInvoice.usecase';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';
import FindInvoiceUseCase from '../../../modules/invoice/use_case/find_invoice/findInvoice.usecase';
import { idSchema } from '../validators/schemas/shared.schema';

export const invoiceRouter = express.Router();

const invoiceRepository = new InvoiceRepository();
const generateInvoieUseCase = new GenerateInvoiceUseCase(invoiceRepository);
const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
const controller = new InvoiceController(
  generateInvoieUseCase,
  findInvoiceUseCase,
);

invoiceRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(invoiceGenerateSchema, req.body);

    const response = await controller.generate(data);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

invoiceRouter.get('/:invoiceId', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(idSchema, {
      id: req.params.invoiceId,
    });

    const response = await controller.findById(data);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});
