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
import { useEffect, useState } from "react";
import CustomSnackbar from "../../../components/CustomSnackbar/CustomSnackbar";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import type { Product } from "../../../../domain/Product";
import { useDeleteProduct } from "../../../../hooks/product/useDeleteProduct";
import { ProductTable } from "./ProductTable/ProductTable";
import { ProductPagination } from "./ProductPagination/ProductPagination";
import { useAuth } from "../../../../hooks/auth/useAuth";

export default function ProductList() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [productDelete, setProductDelete] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { isAdimn } = useAuth();

  const { data: paginateProducts, isLoading, isError } = useProducts(page);

  const { mutate, isPending, isError: isErrorDelete } = useDeleteProduct();

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
    }
  }, [isError]);

  const products = paginateProducts?.data ?? [];

  const goToCreateProduct = () => navigate("/products/create");

  const closeModal = () => {
    setOpenModal(false);
    setProductDelete(null);
  };

  const onConfirmDelete = () => {
    if (!productDelete) return;
    mutate(
      { id: productDelete.id },
      {
        onSuccess: closeModal,
        onError: closeModal,
      }
    );
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <CustomSnackbar
        open={openSnackbar}
        setOpen={() => setOpenModal(false)}
        severity="error"
        message="Erreur lors du chargement des produits"
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
            <ProductTable products={products} />
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

      {productDelete && (
        <ConfirmationDialog
          open={openModal}
          onClose={closeModal}
          onConfirm={onConfirmDelete}
          title="Supprimer le produit"
          description={`Êtes-vous sûr de vouloir supprimer le produit ${productDelete.name} ?`}
          confirmText="Supprimer"
          confirmColor="error"
          cancelText="Annuler"
          loading={isPending}
          error={
            isErrorDelete
              ? "Impossible de supprimer le produit pour le moment. Veuillez réessayer ultérieurement"
              : undefined
          }
        />
      )}
    </Container>
  );
}
