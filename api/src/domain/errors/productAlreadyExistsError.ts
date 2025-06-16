export class ProductAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`A product with code ${code} already exists.`);
    this.name = "ProductAlreadyExistsError";
  }
}
