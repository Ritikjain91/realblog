import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Write", path: "/create" },
    { text: "Login", path: "/login" },
    { text: "Signup", path: "/signup" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            BlogBook
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ) : (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: "#ffffff",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { color: "#bdbdbd" },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: "#000000",
            color: "#ffffff",
            width: 220,
          },
        }}
      >
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#ffffff" }}>
            BlogBook
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  "&:hover": {
                    backgroundColor: "#111111",
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  sx={{
                    textAlign: "center",
                    color: "#ffffff",
                    textTransform: "none",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
