import { Snackbar, Alert } from "@mui/material";
import type {
  CustomSnackbarProps,
  SnackbarState,
} from "./CustomSnackbar.types";

export const snackbarDefaultValue: SnackbarState = {
  open: false,
  message: "",
  state: "info",
};

export default function CustomSnackbar({
  open,
  setOpen,
  severity,
  message,
}: CustomSnackbarProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity || "info"}>
        {message}
      </Alert>
    </Snackbar>
  );
}
