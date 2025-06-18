import { CartRepository } from "../../domain/ports/cart.repository";
import {
  Cart,
  CartItem,
  CartItemInput,
  ProductCart,
} from "../../domain/models/cart";
import { CartModel } from "../database/models/cart.model";
import { Types } from "mongoose";

export class CartImplRepository implements CartRepository {
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const cart = await CartModel.findOne({ userId })
      .populate("items.productId")
      .lean();

    if (!cart) {
      return null;
    }

    return {
      userId: (cart.userId as Types.ObjectId).toString(),
      items: cart.items.map((item: any) => ({
        product: {
          id: item.productId._id.toString(),
          name: item.productId.name,
          code: item.productId.code,
          price: item.productId.price,
          quantity: item.productId.quantity,
          description: item.productId.description,
        },
        quantity: item.quantity,
      })),
    };
  }

  async getCartItemCountByUserId(userId: string): Promise<number> {
    const result = await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $project: { total: { $sum: "$items.quantity" } } },
    ]);

    return result[0]?.total ?? 0;
  }

  async addItemToCart(userId: string, cartItem: CartItemInput): Promise<Cart> {
    let cart = await CartModel.findOne({ userId });

    const newItem = {
      productId: new Types.ObjectId(cartItem.productId),
      quantity: cartItem.quantity,
    };

    if (!cart) {
      cart = new CartModel({ userId, items: [newItem] });
    } else {
      const index = cart.items.findIndex(
        (item) => item?.productId?._id.toString() === cartItem.productId
      );
      if (index !== -1) {
        cart.items[index].quantity += cartItem.quantity;
      } else {
        cart.items.push(newItem);
      }
    }

    await cart.save();

    let cartData = await CartModel.findById(cart.id).populate(
      "items.productId"
    );
    return {
      userId: cart?.userId?.toString() || "",
      items:
        cartData?.items?.map((item: any) => ({
          product: {
            id: item.productId.id.toString(),
            name: item.productId.name,
            code: item.productId.code,
            price: item.productId.price,
            quantity: item.productId.quantity,
            description: item.productId.description,
          },
          quantity: item.quantity,
        })) || [],
    };
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );
    if (!cart) {
      throw new Error("Cart not found");
    }

    const index = cart.items.findIndex(
      (item) => item?.productId?._id.toString() === productId
    );

    if (index === -1) {
      throw new Error("Product not found in cart");
    }

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    await cart.save();

    return {
      userId: cart?.userId?.toString() || "",
      items: cart.items.map((item: any) => ({
        product: {
          id: item.productId._id.toString(),
          name: item.productId.name,
          code: item.productId.code,
          price: item.productId.price,
          quantity: item.productId.quantity,
          description: item.productId.description,
        },
        quantity: item.quantity,
      })),
    };
  }

  async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.items.length === 1) {
      await this.clearCart(userId);
    } else {
      cart.items.pull({ productId: new Types.ObjectId(productId) });
      await cart.save();
    }

    return {
      userId: cart?.userId?.toString() || "",
      items: cart.items.map((item: any) => ({
        product: {
          id: item.productId._id.toString(),
          name: item.productId.name,
          code: item.productId.code,
          price: item.productId.price,
          quantity: item.productId.quantity,
          description: item.productId.description,
        },
        quantity: item.quantity,
      })),
    };
  }

  async clearCart(userId: string): Promise<boolean> {
    const result = await CartModel.deleteOne({ userId });
    return result.deletedCount >= 1;
  }
}
