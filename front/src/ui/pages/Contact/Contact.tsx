import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

type ContactFormInputs = {
  email: string;
  message: string;
};

export const Contact = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormInputs) => {
    console.log("Contact form submitted:", data);
    setOpen(true);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <CustomSnackbar
        open={open}
        setOpen={() => setOpen(false)}
        severity={"success"}
        message={"Demande de contact envoyée avec succès."}
      />
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "L'email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email invalide",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          rules={{
            required: "Le message est requis",
            maxLength: {
              value: 300,
              message: "Le message doit contenir au maximum 300 caractères",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors.message}
              helperText={
                errors.message?.message || `${field.value.length}/300`
              }
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};
