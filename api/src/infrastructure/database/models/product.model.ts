import { Schema, model, Document } from "mongoose";
import { INVENTORY_STATUS, Product } from "../../../domain/models/product";

const productSchema = new Schema<Product>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    internalReference: { type: String },
    shellId: { type: Number },
    inventoryStatus: {
      type: String,
      enum: INVENTORY_STATUS,
      required: true,
      default: INVENTORY_STATUS.INSTOCK,
    },
    rating: { type: Number },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  // pour ajouter `id`
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const ProductModel = model<Product>("Product", productSchema);
