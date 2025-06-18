import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../../data/api/cartApi";
import type { Cart } from "../../domain/Cart";

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation<Cart, Error & { status?: number }, { id: string }>({
    mutationKey: ["deleteItem"],
    mutationFn: ({ id }) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["count"] });
    },
  });
}
