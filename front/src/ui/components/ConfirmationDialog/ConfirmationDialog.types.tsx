export type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  error?: string;
  confirmColor?:
    | "primary"
    | "error"
    | "inherit"
    | "secondary"
    | "success"
    | "info"
    | "warning";
};
