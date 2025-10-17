import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    
    <AppBar  position="sticky"
  sx={{ backgroundColor: '#100101ff' }}

>
      <Toolbar >
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          BlogBook
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/create">Write</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/create">Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
