import { useQuery } from "@tanstack/react-query";
import { getCartItemCount } from "../../data/api/cartApi";

export function useCountItems() {
  return useQuery({
    queryKey: ["count"],
    queryFn: () => getCartItemCount(),
  });
}
