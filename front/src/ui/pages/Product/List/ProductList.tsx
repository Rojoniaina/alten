import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../../hooks/product/useProducts";
import { useState } from "react";
import CustomSnackbar, {
  snackbarDefaultValue,
} from "../../../components/CustomSnackbar/CustomSnackbar";
import { ProductTable } from "./ProductTable/ProductTable";
import { ProductPagination } from "./ProductPagination/ProductPagination";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useAddItems } from "../../../../hooks/cart/useAddItem";
import type { CartItemInput } from "../../../../domain/Cart";
import type { SnackbarState } from "../Create/CreateProduct.types";

export default function ProductList() {
  const [snackbarState, setSnackbarState] =
    useState<SnackbarState>(snackbarDefaultValue);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { isAdimn } = useAuth();

  const { data: paginateProducts, isLoading } = useProducts(page);

  const { mutate } = useAddItems();

  const products = paginateProducts?.data ?? [];

  const goToCreateProduct = () => navigate("/products/create");

  const onConfirmAdd = (productAdd: CartItemInput) => {
    mutate(productAdd, {
      onSuccess: () => {
        setSnackbarState({
          open: true,
          message: "Le produit a été ajouter avec succès",
          state: "success",
        });
      },
      onError: () => {
        setSnackbarState({
          open: true,
          message: "Nous n’avons pas pu ajouter le produit. Veuillez réessayer",
          state: "error",
        });
      },
    });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <CustomSnackbar
        open={snackbarState.open}
        setOpen={() => setSnackbarState(snackbarDefaultValue)}
        severity={snackbarState.state}
        message={snackbarState.message}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Liste des produits
        </Typography>
        {isAdimn && (
          <Button
            variant="outlined"
            size="small"
            sx={{ height: 30 }}
            onClick={goToCreateProduct}
          >
            Créer un produit
          </Button>
        )}
      </Box>

      <Stack spacing={2}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <>
            <ProductTable products={products} onAddToCart={onConfirmAdd} />
            <ProductPagination
              count={paginateProducts?.totalPages || 0}
              page={page}
              onChange={handlePageChange}
            />
          </>
        ) : (
          <Typography align="center" pt={2}>
            Aucun produit trouvé
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
