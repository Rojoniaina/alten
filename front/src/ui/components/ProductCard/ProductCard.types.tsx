import type { Product } from "../../../domain/Product";

export type ProductCardProps = {
  product: Product;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};
