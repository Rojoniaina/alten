import { CartImplRepository } from "../infrastructure/repositories/cart-impl.repository";
import { CartUseCase } from "../application/cart.usecase";

const cartRepository = new CartImplRepository();
export const cartServiceCase = new CartUseCase(cartRepository);
