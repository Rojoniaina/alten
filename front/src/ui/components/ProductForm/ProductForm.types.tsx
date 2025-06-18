import type { CreateProductInput, Product } from "../../../domain/Product";

export type ProductFormProps = {
  title: string;
  product?: Product;
  btnSubmitTitle?: string;
  btnBackTitle?: string;
  onSubmitForm: (data: CreateProductInput, success: () => void) => void;
  goBack: () => void;
};
