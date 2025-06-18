export type CustomSnackbarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  severity?: "success" | "error" | "info";
};

export type SnackbarState = {
  open: boolean;
  message: string;
  state: "success" | "error" | "info";
};
