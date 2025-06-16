import { ProductUseCase } from "../../src/application/product.usecase";
import { ProductAlreadyExistsError } from "../../src/domain/errors/productAlreadyExistsError";
import { INVENTORY_STATUS } from "../../src/domain/models/product";
import { ProductRepository } from "../../src/domain/ports/product.repository";

describe("ProductUseCase", () => {
  const mockProduct = {
    id: "test",
    name: "Product A",
    code: "AAA",
    description: "",
    image: "",
    category: "",
    price: 0,
    quantity: 0,
    internalReference: "",
    shellId: 0,
    inventoryStatus: INVENTORY_STATUS.INSTOCK,
    rating: 0,
    createdAt: 0,
    updatedAt: 0,
  };
  const mockProductB = {
    name: "Product B",
    code: "BBB",
    description: "",
    image: "",
    category: "",
    price: 0,
    quantity: 0,
    internalReference: "",
    shellId: 0,
    inventoryStatus: INVENTORY_STATUS.INSTOCK,
    rating: 0,
    createdAt: 0,
    updatedAt: 0,
  };

  const repositoryMock: jest.Mocked<ProductRepository> = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const usecase = new ProductUseCase(repositoryMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts should return paginate list", async () => {
    repositoryMock.findAll.mockResolvedValue({
      data: [mockProduct],
      limit: 10,
      page: 1,
      totalPages: 1,
      totalItems: 1,
    });
    const result = await usecase.getProducts(1, 10);
    expect(repositoryMock.findAll).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual({
      data: [mockProduct],
      limit: 10,
      page: 1,
      totalPages: 1,
      totalItems: 1,
    });
  });

  test("getProduct should return a product", async () => {
    repositoryMock.findById.mockResolvedValue(mockProduct);
    const result = await usecase.getProduct("test");
    expect(repositoryMock.findById).toHaveBeenCalledWith("test");
    expect(result).toEqual(mockProduct);
  });

  test("createProduct should throw ProductAlreadyExistsError if code product exists", async () => {
    repositoryMock.findByCode.mockResolvedValue(mockProduct);

    await expect(
      usecase.createProduct({ ...mockProductB, code: "AAA" })
    ).rejects.toThrow(ProductAlreadyExistsError);

    expect(repositoryMock.findByCode).toHaveBeenCalledWith("AAA");
    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

  test("createProduct should return new product", async () => {
    repositoryMock.findByCode.mockResolvedValue(null);
    repositoryMock.create.mockResolvedValue({
      id: "testB",
      ...mockProductB,
    });

    const result = await usecase.createProduct(mockProductB);

    expect(repositoryMock.findByCode).toHaveBeenCalledWith("BBB");
    expect(result).toEqual({
      id: "testB",
      ...mockProductB,
    });
  });

  test("updateProduct should throw ProductAlreadyExistsError if code belongs to another product", async () => {
    repositoryMock.findByCode.mockResolvedValue(mockProduct);

    await expect(
      usecase.updateProduct("testB", { ...mockProductB, code: "AAA" })
    ).rejects.toThrow(ProductAlreadyExistsError);

    expect(repositoryMock.findByCode).toHaveBeenCalledWith("AAA");
    expect(repositoryMock.update).not.toHaveBeenCalled();
  });

  test("updateProduct should return a product updated", async () => {
    const mockUpdate = {
      name: "Product X",
      code: "XXXX",
      description: "",
      image: "",
      category: "",
      price: 0,
      quantity: 0,
      internalReference: "",
      shellId: 0,
      inventoryStatus: INVENTORY_STATUS.INSTOCK,
      rating: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    repositoryMock.findByCode.mockResolvedValue(null);
    repositoryMock.update.mockResolvedValue({ id: "testB", ...mockUpdate });

    const result = await usecase.updateProduct("testB", mockUpdate);

    expect(repositoryMock.findByCode).toHaveBeenCalledWith("XXXX");
    expect(result).toEqual({ id: "testB", ...mockUpdate });
  });

  test("deleteProduct should return true", async () => {
    repositoryMock.delete.mockResolvedValue(true);

    const result = await usecase.deleteProduct("test");

    expect(repositoryMock.delete).toHaveBeenCalledWith("test");
    expect(result).toBe(true);
  });
});
