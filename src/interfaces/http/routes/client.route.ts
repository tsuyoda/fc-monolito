import express, { Request, Response } from 'express';
import ClientController from '../controllers/client.controller';
import Validator from '../validators/validator';
import ClientRepository from '../../../modules/client_adm/repository/client.repository';
import AddClientUseCase from '../../../modules/client_adm/use_case/add_client/addClient.usecase';
import { clientCreateSchema } from '../validators/schemas/client.schema';
import { idSchema } from '../validators/schemas/shared.schema';
import FindClientUseCase from '../../../modules/client_adm/use_case/find_client/findClient.usecase';

export const clientRouter = express.Router();

const repository = new ClientRepository();
const addClientUseCase = new AddClientUseCase(repository);
const findClientUseCase = new FindClientUseCase(repository);
const controller = new ClientController(addClientUseCase, findClientUseCase);

clientRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(clientCreateSchema, req.body);

    const response = await controller.create(data);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

clientRouter.get('/:clientId', async (req: Request, res: Response) => {
  try {
    const data = await Validator.validate(idSchema, {
      id: req.params.clientId,
    });

    const response = await controller.findById(data);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});
