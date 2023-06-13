import { ProductDocument } from './Product';

export interface CartItemd extends ProductDocument {
  quantity: number;
}

export type Cart = CartItemd[];
