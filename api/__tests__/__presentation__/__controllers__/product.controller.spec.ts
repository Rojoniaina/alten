import request from "supertest";
import app from "../../../src/server";
import { productServiceCase } from "../../../src/services/product.service";
import { ProductAlreadyExistsError } from "../../../src/domain/errors/productAlreadyExistsError";
import { NextFunction } from "express";

// Mock des middlewares
jest.mock("../../../src/presentation/middleware/auth.middleware", () => ({
  __esModule: true,
  default: (_: any, __: any, next: NextFunction) => next(),
}));

jest.mock("../../../src/presentation/middleware/admin.middleware", () => ({
  __esModule: true,
  default: (_: any, __: any, next: NextFunction) => next(),
}));

jest.mock("../../../src/services/product.service");

describe("Product Controller", () => {
  const mockProduct = { id: "test", name: "Product A" };
  const fakeToken = "fake-jwt-token";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /products should return paginated products", async () => {
    (productServiceCase.getProducts as jest.Mock).mockResolvedValue({
      data: [mockProduct],
      total: 1,
    });

    const res = await request(app)
      .get("/api/v1/products?page=1&limit=10")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: [mockProduct], total: 1 });
    expect(productServiceCase.getProducts).toHaveBeenCalledWith(1, 10);
  });

  it("GET /products should return 500 if db down", async () => {
    jest
      .spyOn(productServiceCase, "getProducts")
      .mockRejectedValue(new Error("DB down"));

    const res = await request(app)
      .get("/api/v1/products")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Internal server error",
      message: "DB down",
    });
  });

  test("GET /products/:id should return a product", async () => {
    (productServiceCase.getProduct as jest.Mock).mockResolvedValue(mockProduct);

    const res = await request(app)
      .get("/api/v1/products/test")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
    expect(productServiceCase.getProduct).toHaveBeenCalledWith("test");
  });

  test("POST /products should create a product", async () => {
    (productServiceCase.createProduct as jest.Mock).mockResolvedValue(
      mockProduct
    );

    const res = await request(app)
      .post("/api/v1/products")
      .send({ code: "BBB", name: "Product B" })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockProduct);
    expect(productServiceCase.createProduct).toHaveBeenCalledWith({
      name: "Product B",
      code: "BBB",
    });
  });

  test("POST /products should return 409 if code of product already exists", async () => {
    (productServiceCase.createProduct as jest.Mock).mockRejectedValue(
      new ProductAlreadyExistsError("Already exists")
    );

    const res = await request(app)
      .post("/api/v1/products")
      .send({ name: "Product A", code: "AAA" })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      error: "Conflict",
      message: "A product with code Already exists already exists.",
    });
  });

  test("PATCH /products/:id should update a product", async () => {
    (productServiceCase.updateProduct as jest.Mock).mockResolvedValue(
      mockProduct
    );

    const res = await request(app)
      .patch("/api/v1/products/test")
      .send({ name: "Updated", code: "AAA" })
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
    expect(productServiceCase.updateProduct).toHaveBeenCalledWith("test", {
      name: "Updated",
      code: "AAA",
    });
  });

  test("DELETE /products/:id should delete a product", async () => {
    (productServiceCase.deleteProduct as jest.Mock).mockResolvedValue(true);

    const res = await request(app)
      .delete("/api/v1/products/test")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(true);
    expect(productServiceCase.deleteProduct).toHaveBeenCalledWith("test");
  });
});
