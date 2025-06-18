import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../data/api/productApi";

export function useProducts(page: number) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
  });
}
