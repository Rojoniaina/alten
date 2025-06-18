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
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import CustomSnackbar, {
  snackbarDefaultValue,
} from "../../../components/CustomSnackbar/CustomSnackbar";
import { useLogin } from "../../../../hooks/auth/useLogin";
import type { SnackbarState } from "../../../components/CustomSnackbar/CustomSnackbar.types";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [snackbarState, setSnackbarState] =
    useState<SnackbarState>(snackbarDefaultValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (status === "done") {
      setSnackbarState({
        open: true,
        message: "Votre compte a été créer avec succès",
        state: "success",
      });
    }
  }, [status]);

  const { mutate, isPending } = useLogin();

  const onSubmit = async (data: LoginFormInputs) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (err) => {
          let message = "Une erreur s’est produite pendant votre connexion.";
          switch (err?.status) {
            case 401:
              message = "Le mot de passe saisi est incorrect.";
              break;
            case 404:
              message = "Aucun compte n’est associé à cette adresse e-mail.";
              break;
            default:
              break;
          }
          setSnackbarState({
            open: true,
            message,
            state: "error",
          });
        },
      }
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <CustomSnackbar
        open={snackbarState.open}
        setOpen={() => setSnackbarState(snackbarDefaultValue)}
        severity={snackbarState.state}
        message={snackbarState.message}
      />
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
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
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button type="submit" variant="contained">
            {isPending ? "loading..." : `Se connecter`}
          </Button>
          <MuiLink
            component={RouterLink}
            to="/signup"
            variant="body2"
            alignSelf="center"
          >
            Créer un compte
          </MuiLink>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
