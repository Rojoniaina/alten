export type SnackbarState = {
  open: boolean;
  message: string;
  state: "success" | "error" | "info";
};
