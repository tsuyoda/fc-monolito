import express from 'express';
import { clientRouter } from '../../interfaces/http/routes/client.route';
import { productRouter } from '../../interfaces/http/routes/product.route';
import { checkoutRouter } from '../../interfaces/http/routes/checkout.route';

export const app = express();

app.use(express.json());

app.use('/client', clientRouter);
app.use('/product', productRouter);
app.use('/checkout', checkoutRouter);
