import PlaceOrderUseCase from '../../../modules/checkout/use_case/placeOrder.usecase';
import { IPlaceOrderSchema } from '../validators/schemas/checkout.schema';

export default class CheckoutController {
  constructor(private placeOrderUseCase: PlaceOrderUseCase) {}

  async placeOrder(data: IPlaceOrderSchema) {
    return this.placeOrderUseCase.execute(data);
  }
}
