import { CartRepository } from "../domain/ports/cart.repository";
import { CartItem, Cart, CartItemInput } from "../domain/models/cart";

export class CartUseCase {
  constructor(private cartRepo: CartRepository) {}

  getCart(userId: string): Promise<Cart | null> {
    return this.cartRepo.getCartByUserId(userId);
  }

  async getCartItemCount(userId: string): Promise<number> {
    return this.cartRepo.getCartItemCountByUserId(userId);
  }

  addItem(userId: string, item: CartItemInput): Promise<Cart> {
    return this.cartRepo.addItemToCart(userId, item);
  }

  updateItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    return this.cartRepo.updateItemQuantity(userId, productId, quantity);
  }

  removeItem(userId: string, productId: string): Promise<Cart> {
    return this.cartRepo.removeItemFromCart(userId, productId);
  }

  clearCart(userId: string): Promise<boolean> {
    return this.cartRepo.clearCart(userId);
  }
}
