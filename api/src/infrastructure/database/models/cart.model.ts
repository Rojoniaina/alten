import { model, Schema, Document } from "mongoose";

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true, min: 1 },
});

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  items: [CartItemSchema],
});

export const CartModel = model("Cart", CartSchema);
