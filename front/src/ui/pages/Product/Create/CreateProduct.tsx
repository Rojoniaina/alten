import { Backdrop, CircularProgress, Container } from "@mui/material";
import Form from "../../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomSnackbar, {
  snackbarDefaultValue,
} from "../../../components/CustomSnackbar/CustomSnackbar";
import type { SnackbarState } from "./CreateProduct.types";
import { useCreateProduct } from "../../../../hooks/product/useCreateProducts";
import type { CreateProductInput } from "../../../../domain/Product";

export default function CreateProduct() {
  const [snackbarState, setSnackbarState] =
    useState<SnackbarState>(snackbarDefaultValue);
  const [isChangeTitle, setIsChangeTitle] = useState<boolean>(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const { mutate, isPending } = useCreateProduct();

  const onSubmitForm = (data: CreateProductInput, success: () => void) => {
    console.log("dataaa", data);

    mutate(data, {
      onSuccess: () => {
        success();
        setSnackbarState({
          open: true,
          message: "Le produit a été enregistré avec succès",
          state: "success",
        });
        setIsChangeTitle(true);
      },
      onError: (err) => {
        setSnackbarState({
          open: true,
          message:
            err?.status && err?.status === 409
              ? "Cet code est déjà associé à un produit. Veuillez en choisir un autre."
              : "Nous n’avons pas pu créer le produit. Veuillez réessayer",
          state: "error",
        });
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomSnackbar
        open={snackbarState.open}
        setOpen={() => setSnackbarState(snackbarDefaultValue)}
        severity={snackbarState.state}
        message={snackbarState.message}
      />
      <Form
        title="Créer un produit"
        btnBackTitle={isChangeTitle ? "Voir la liste des produits" : "Retour"}
        onSubmitForm={onSubmitForm}
        goBack={goBack}
      />
    </Container>
  );
}
