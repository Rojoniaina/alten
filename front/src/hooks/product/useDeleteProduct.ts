import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "../../data/api/productApi";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<Boolean, Error & { status?: number }, { id: string }>({
    mutationFn: ({ id }) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
