import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Button,
  Paper,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useGetCart } from "../../../hooks/cart/useGetCart";
import { useDeleteItem } from "../../../hooks/cart/useDeleteItem";
import { useDeleteCart } from "../../../hooks/cart/useDeleteCart";

export const Cart = () => {
  const { data } = useGetCart();
  const { mutate: clearCart } = useDeleteCart();
  const { mutate: deleteItem } = useDeleteItem();

  const onDeleteItem = (productId: string) => {
    deleteItem({ id: productId });
  };

  const handleDeleteCart = () => {
    clearCart();
  };

  const total = data?.items?.length
    ? data.items.reduce(
        (sum, item) => sum + (item.product.price || 1) * item.quantity,
        0
      )
    : 0;

  const items = data && data?.items.length > 0 ? data && data?.items : [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mon Panier
      </Typography>

      {items.length === 0 ? (
        <Typography>Votre panier est vide.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prix (€)</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>
                      {item?.product?.price?.toFixed(2) ?? 0}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() =>
                          item.product.id
                            ? onDeleteItem(item.product.id)
                            : undefined
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{total.toFixed(2)} €</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="error"
            startIcon={<RemoveShoppingCartIcon />}
            onClick={handleDeleteCart}
            sx={{ mt: 2 }}
            disabled={items.length === 0}
          >
            Vider le panier
          </Button>
        </>
      )}
    </Container>
  );
};
