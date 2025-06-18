import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../data/api/cartApi";
import type { Cart } from "../../domain/Cart";

export function useGetCart() {
  return useQuery<Cart, Error & { status?: number }>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
}
