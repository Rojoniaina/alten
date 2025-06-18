import { Typography, Paper, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { ProductCardProps } from "./ProductCard.types";

export default function ProductCard({
  product,
  onClickDelete,
  onClickEdit,
}: ProductCardProps) {
  return (
    <Paper
      key={product.id}
      elevation={2}
      sx={{
        p: 2,
        position: "relative",
      }}
    >
      <Typography variant="h6">{product.name}</Typography>
      <Typography color="text.secondary">{product.code}</Typography>
      <Typography color="text.secondary">{product.price}</Typography>
      <Typography color="text.secondary">{product.quantity}</Typography>
      <Typography color="text.secondary">{product.description}</Typography>

      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 0.5,
        }}
      >
        {onClickEdit && (
          <IconButton
            color="primary"
            size="small"
            onClick={onClickEdit}
            title="edit"
          >
            <EditIcon />
          </IconButton>
        )}
        {onClickDelete && (
          <IconButton
            color="error"
            size="small"
            onClick={onClickDelete}
            title="delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
