import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { Product } from "../../../../../domain/Product";
import type { CartItemInput } from "../../../../../domain/Cart";

export function ProductTable({
  products,
  onAddToCart,
  isPending,
}: {
  products: Product[];
  onAddToCart?: (product: CartItemInput) => void;
  isPending?: boolean;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prix (€)</TableCell>
            <TableCell>Quantité</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.code}>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.inventoryStatus}</TableCell>
              <TableCell>
                {isPending ? (
                  "En cours..."
                ) : (
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onAddToCart?.({
                        productId: product.id,
                        quantity: 1,
                      })
                    }
                    disabled={product.quantity <= 0}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
