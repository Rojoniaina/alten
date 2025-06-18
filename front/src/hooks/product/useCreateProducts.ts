import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProductInput, Product } from "../../domain/Product";
import { createProduct } from "../../data/api/productApi";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error & { status?: number }, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
