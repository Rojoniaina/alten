import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../data/api/cartApi";

export function useDeleteCart() {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error & { status?: number }>({
    mutationKey: ["removeCard"],
    mutationFn: clearCart,
    onSuccess: (data) => {
      console.log("✅ Mutation success", data);
      console.log(
        "Cache before invalidate:",
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => q.queryKey)
      );
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["count"] });
      console.log(
        "Cache after invalidate:",
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => q.queryKey)
      );
    },
  });
}
