import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart } from "../../data/api/cartApi";
import type { Cart, CartItemInput } from "../../domain/Cart";

export function useAddItems() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error & { status?: number }, CartItemInput>({
    mutationKey: ["addItem"],
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["count"] });
    },
  });
}
