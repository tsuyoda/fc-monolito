import { OrderModel } from '../../../infrastructure/database/models/order.model';
import { OrderItemModel } from '../../../infrastructure/database/models/orderItem.model';
import Address from '../../@shared/domain/value_object/address.valueObject';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Client from '../domain/client.entity';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import ICheckoutGateway from '../gateway/checkout.gateway';

export default class OrderRepository implements ICheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id.value,
        status: order.status,
        clientId: order.client.id.value,
        items: order.products.map(product => ({
          id: new Id().value,
          catalogProductId: product.catalogProductId.value,
          productId: product.id.value,
          orderId: order.id.value,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [OrderItemModel] },
    );
  }

  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: { all: true, nested: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const address = new Address(
      order.client.street,
      order.client.number,
      order.client.complement,
      order.client.city,
      order.client.state,
      order.client.zipcode,
    );

    const client = new Client({
      id: new Id(order.client.id),
      name: order.client.name,
      email: order.client.email,
      address: address.toString(),
    });

    const products = order.items.map(
      item =>
        new Product({
          id: new Id(item.productId),
          catalogProductId: new Id(item.catalogProductId),
          name: item.catalogProduct.name,
          description: item.catalogProduct.description,
          salesPrice: item.catalogProduct.salesPrice,
        }),
    );

    return new Order({
      id: new Id(order.id),
      status: order.status,
      client,
      products,
    });
  }
}
