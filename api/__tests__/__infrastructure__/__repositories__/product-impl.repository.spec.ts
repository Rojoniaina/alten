import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ProductImplRepository } from "../../../src/infrastructure/repositories/product-impl.repository";
import { ProductModel } from "../../../src/infrastructure/database/models/product.model";
import { INVENTORY_STATUS } from "../../../src/domain/models/product";

describe("ProductImplRepository", () => {
  let mongoServer: MongoMemoryServer;
  let repository: ProductImplRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    repository = new ProductImplRepository();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("should create a product", async () => {
    const product = await repository.create({
      code: "P001",
      name: "Product 1",
      price: 100,
      quantity: 10,
      inventoryStatus: INVENTORY_STATUS.INSTOCK,
    });

    expect(product.code).toBe("P001");
    expect(product.name).toBe("Product 1");
    expect(product?.price).toBe(100);
    expect(product?.quantity).toBe(10);
  });

  it("should find by code", async () => {
    await repository.create({
      code: "P002",
      name: "Product 2",
      price: 50,
      quantity: 5,
      inventoryStatus: INVENTORY_STATUS.INSTOCK,
    });

    const found = await repository.findByCode("P002");

    expect(found?.code).toBe("P002");
    expect(found?.name).toBe("Product 2");
    expect(found?.price).toBe(50);
    expect(found?.quantity).toBe(5);
  });

  it("should return paginated products", async () => {
    await repository.create({
      code: "P003",
      name: "Product 3",
      price: 20,
      quantity: 2,
      inventoryStatus: INVENTORY_STATUS.OUTOFSTOCK,
    });

    const result = await repository.findAll(1, 10);

    expect(result.data.length).toBe(1);
    expect(result.totalItems).toBe(1);
  });

  it("should update product", async () => {
    const dataProduct = {
      code: "P004",
      name: "Product 4",
      price: 70,
      quantity: 7,
      inventoryStatus: INVENTORY_STATUS.INSTOCK,
    };
    const product = await repository.create(dataProduct);

    const updated = await repository.update(product.id, {
      ...product,
      name: "Updated Product 4",
      inventoryStatus: INVENTORY_STATUS.OUTOFSTOCK,
    });

    expect(updated?.name).toBe("Updated Product 4");
    expect(updated?.inventoryStatus).toBe(INVENTORY_STATUS.OUTOFSTOCK);
  });

  it("should delete product", async () => {
    const product = await repository.create({
      code: "P005",
      name: "Product 5",
      price: 90,
      quantity: 9,
      inventoryStatus: INVENTORY_STATUS.OUTOFSTOCK,
    });

    const deleted = await repository.delete(product.id);
    expect(deleted).toBe(true);

    const found = await repository.findById(product.id);
    expect(found).toBeNull();
  });
});
