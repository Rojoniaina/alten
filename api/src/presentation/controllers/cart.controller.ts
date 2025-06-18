import { Request, Response } from "express";
import { cartServiceCase } from "../../services/cart.service";
import { httpErrorSend } from "../../utils/errors";

export const getCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const cart = await cartServiceCase.getCart(userId);
  res.json(cart || { items: [] });
};

export const addItemToCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const item = req.body;
  const updatedCart = await cartServiceCase.addItem(userId, item);
  res.status(201).json(updatedCart);
};

export const updateCartItem = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const updatedCart = await cartServiceCase.updateItem(
    userId,
    productId,
    quantity
  );
  res.json(updatedCart);
};

export const getCartItemCount = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const count = await cartServiceCase.getCartItemCount(userId);
    res.status(200).json({ count });
  } catch (error: any) {
    httpErrorSend(res, { message: error?.message });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const { productId } = req.params;
  const updatedCart = await cartServiceCase.removeItem(userId, productId);
  res.json(updatedCart);
};

export const clearCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  await cartServiceCase.clearCart(userId);
  res.status(204).send();
};
