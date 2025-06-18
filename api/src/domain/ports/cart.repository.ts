import { Cart, CartItem, CartItemInput } from "../models/cart";

export interface CartRepository {
  getCartByUserId(userId: string): Promise<Cart | null>;
  getCartItemCountByUserId(userId: string): Promise<number>;
  addItemToCart(userId: string, cartItem: CartItemInput): Promise<Cart>;
  updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Cart>;
  removeItemFromCart(userId: string, productId: string): Promise<Cart>;
  clearCart(userId: string): Promise<boolean>;
}
