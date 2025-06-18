import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { CreateUserInput } from "../../../../domain/User";
import { useCreateUser } from "../../../../hooks/user/useCreateUser";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import type { SnackbarState } from "../../../components/CustomSnackbar/CustomSnackbar.types";
import CustomSnackbar, {
  snackbarDefaultValue,
} from "../../../components/CustomSnackbar/CustomSnackbar";

type UserSignUpInputs = CreateUserInput & {
  confirmPassword: string;
};

export const SignUp: React.FC = () => {
  const [snackbarState, setSnackbarState] =
    useState<SnackbarState>(snackbarDefaultValue);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSignUpInputs>();

  const navigate = useNavigate();

  const { mutate, isPending } = useCreateUser();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onSubmit = (data: UserSignUpInputs) => {
    mutate(
      {
        username: data.username,
        firstname: data.firstname,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/login?status=done");
        },
        onError: (err) => {
          setSnackbarState({
            open: true,
            message:
              err?.status && err?.status === 409
                ? "Cet email est déjà associé à un utilisateur. Veuillez en choisir un autre."
                : "Nous n’avons pas pu créer votre compte. Veuillez réessayer",
            state: "error",
          });
        },
      }
    );
  };

  const password = watch("password");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <CustomSnackbar
        open={snackbarState.open}
        setOpen={() => setSnackbarState(snackbarDefaultValue)}
        severity={snackbarState.state}
        message={snackbarState.message}
      />
      <Typography variant="h4" gutterBottom>
        Créer un compte
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Nom d'utilisateur"
            {...register("username", { required: "Nom d'utilisateur requis" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />

          <TextField
            label="Prénom"
            {...register("firstname", { required: "Prénom requis" })}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalide",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Mot de passe"
            type="password"
            {...register("password", {
              required: "Mot de passe requis",
              minLength: {
                value: 6,
                message: "Au moins 6 caractères",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <TextField
            label="Confirmer le mot de passe"
            type="password"
            {...register("confirmPassword", {
              required: "Confirmation requise",
              validate: (value) =>
                value === password || "Les mots de passe ne correspondent pas",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />

          <Button type="submit" variant="contained">
            {isPending ? "loading..." : `S'inscrire`}
          </Button>
          <MuiLink
            component={RouterLink}
            to="/login"
            variant="body2"
            alignSelf="center"
          >
            Retour
          </MuiLink>
        </Stack>
      </Box>
    </Container>
  );
};
