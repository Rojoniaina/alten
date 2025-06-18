import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCountItems } from "../../../hooks/cart/useCountItems";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const { data: cartCount } = useCountItems();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ma Boutique
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Produits
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        <IconButton color="inherit" component={Link} to="/cart" sx={{ mx: 2 }}>
          <Badge badgeContent={cartCount?.count ?? 0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
        >
          Déconnexion
        </Button>
      </Toolbar>
    </AppBar>
  );
};
