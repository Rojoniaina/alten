import { ProductRepository } from "../../domain/ports/product.repository";
import {
  CreateProductInput,
  Product,
  ProductPaginatedResult,
  UpdateProductInput,
} from "../../domain/models/product";
import { ProductModel } from "../database/models/product.model";

export class ProductImplRepository implements ProductRepository {
  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<ProductPaginatedResult> {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(),
    ]);
    const data = products?.length
      ? products.map(({ _id, ...rest }) => ({
          ...rest,
          id: _id.toString(),
        }))
      : [];
    return {
      data,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  async findById(id: string): Promise<Product | null> {
    return ProductModel.findById(id).exec();
  }

  async findByCode(code: string): Promise<Product | null> {
    return ProductModel.findOne({ code }).exec();
  }

  async create(data: CreateProductInput): Promise<Product> {
    const Product = new ProductModel(data);
    await Product.save();
    return Product.toJSON();
  }

  async update(id: string, data: UpdateProductInput): Promise<Product | null> {
    return ProductModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id: string): Promise<Boolean | null> {
    const result = await ProductModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
