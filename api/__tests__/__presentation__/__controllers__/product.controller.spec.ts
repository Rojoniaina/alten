import request from "supertest";
import app from "../../../src/server";
import { productService } from "../../../src/services/product.service";
import { ProductAlreadyExistsError } from "../../../src/domain/errors/productAlreadyExistsError";

jest.mock("../../../src/services/product.service");

describe("Product Controller", () => {
  const mockProduct = { id: "test", name: "Product A" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /products should return paginated products", async () => {
    (productService.getProducts as jest.Mock).mockResolvedValue({
      data: [mockProduct],
      total: 1,
    });

    const res = await request(app).get("/api/v1/products?page=1&limit=10");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: [mockProduct], total: 1 });
    expect(productService.getProducts).toHaveBeenCalledWith(1, 10);
  });

  it("GET /products should return 500 if db down", async () => {
    jest
      .spyOn(productService, "getProducts")
      .mockRejectedValue(new Error("DB down"));

    const res = await request(app).get("/api/v1/products");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Internal server error",
      message: "DB down",
    });
  });

  test("GET /products/:id should return a product", async () => {
    (productService.getProduct as jest.Mock).mockResolvedValue(mockProduct);

    const res = await request(app).get("/api/v1/products/test");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
    expect(productService.getProduct).toHaveBeenCalledWith("test");
  });

  test("POST /products should create a product", async () => {
    (productService.createProduct as jest.Mock).mockResolvedValue(mockProduct);

    const res = await request(app)
      .post("/api/v1/products")
      .send({ code: "BBB", name: "Product B" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockProduct);
    expect(productService.createProduct).toHaveBeenCalledWith({
      name: "Product B",
      code: "BBB",
    });
  });

  test("POST /products should return 409 if code of product already exists", async () => {
    (productService.createProduct as jest.Mock).mockRejectedValue(
      new ProductAlreadyExistsError("Already exists")
    );

    const res = await request(app)
      .post("/api/v1/products")
      .send({ name: "Product A", code: "AAA" });

    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      error: "Conflict",
      message: "A product with code Already exists already exists.",
    });
  });

  test("PATCH /products/:id should update a product", async () => {
    (productService.updateProduct as jest.Mock).mockResolvedValue(mockProduct);

    const res = await request(app)
      .patch("/api/v1/products/test")
      .send({ name: "Updated", code: "AAA" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
    expect(productService.updateProduct).toHaveBeenCalledWith("test", {
      name: "Updated",
      code: "AAA",
    });
  });

  test("DELETE /products/:id should delete a product", async () => {
    (productService.deleteProduct as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete("/api/v1/products/test");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(true);
    expect(productService.deleteProduct).toHaveBeenCalledWith("test");
  });
});
