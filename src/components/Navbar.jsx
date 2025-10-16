import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          MyBlog
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/create">Write</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
