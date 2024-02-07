import Id from '../../@shared/domain/value_object/id.valueObject';
import IUseCase from '../../@shared/use_case/useCase.interface';
import IClientAdmFacade from '../../client_adm/facade/clientAdm.facade.interface';
import IProductAdmFacade from '../../product_adm/facade/productAdm.facade.interface';
import IStoreCatalogFacade from '../../store_catalog/facade/storeCatalog.facade.interface';
import Client from '../domain/client.entity';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import ICheckoutGateway from '../gateway/checkout.gateway';
import { IPlaceOrderInputDto, IPlaceOrderOutputDto } from './placeOrder.dto';

export default class PlaceOrderUseCase implements IUseCase {
  private _clientFacade: IClientAdmFacade;
  private _productFacade: IProductAdmFacade;
  private _catalogFacade: IStoreCatalogFacade;
  private _orderRepository: ICheckoutGateway;

  constructor(
    clientFacade: IClientAdmFacade,
    productFacade: IProductAdmFacade,
    catalogFacade: IStoreCatalogFacade,
    orderRepository: ICheckoutGateway,
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._orderRepository = orderRepository;
  }

  async execute(input: IPlaceOrderInputDto): Promise<IPlaceOrderOutputDto> {
    const client = await this.getClient(input.clientId);

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map(async product => this.getProduct(product.productId)),
    );

    const order = new Order({
      client,
      products,
    });

    await this._orderRepository.addOrder(order);

    return {
      id: order.id.value,
      total: order.total,
      products: input.products,
    };
  }

  private async validateProducts(input: IPlaceOrderInputDto) {
    if (input.products.length === 0) {
      throw new Error('No products selected');
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });
      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`,
        );
      }
    }
  }

  private async getClient(clientId: string): Promise<Client> {
    const client = await this._clientFacade.find({ id: clientId });

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address.toString(),
    });
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.findByProductId({ productId });

    return new Product({
      id: new Id(product.productId),
      productId: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
