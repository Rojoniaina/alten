import { useForm, Controller } from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import type { ProductFormProps } from "./ProductForm.types";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../../../domain/Product";

export default function ProductForm({
  title,
  onSubmitForm,
  goBack,
  btnSubmitTitle,
  btnBackTitle,
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput | UpdateProductInput>({
    defaultValues: {
      code: "",
      name: "",
      description: "",
      image: "",
      price: 0,
      quantity: 0,
    },
  });

  const onSubmit = (data: CreateProductInput | UpdateProductInput) => {
    onSubmitForm(
      {
        ...data,
        quantity: Number(data?.quantity || 0),
        price: Number(data?.price || 0),
      },
      () => {
        console.log("submit");
        reset();
      }
    );
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="code"
              control={control}
              rules={{ required: "Le code est requis" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Code"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Le nom est requis" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nom"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Url image" fullWidth />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Prix" fullWidth type="number" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantité"
                  fullWidth
                  type="number"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" fullWidth>
              {btnSubmitTitle ?? "Enregistrer"}
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              onClick={goBack}
            >
              {btnBackTitle ?? "Retour"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
