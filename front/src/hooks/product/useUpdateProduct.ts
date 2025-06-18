import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, UpdateProductInput } from "../../domain/Product";
import { updateProduct } from "../../data/api/productApi";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    Product,
    Error & { status?: number },
    { id: string } & UpdateProductInput
  >({
    mutationFn: ({ id, ...data }: { id: string } & UpdateProductInput) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
