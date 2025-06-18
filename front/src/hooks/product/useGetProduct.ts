import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../domain/Product";
import { getProduct } from "../../data/api/productApi";

export function useGetProduct(id: string) {
  return useQuery<Product, Error & { status?: number }>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}
