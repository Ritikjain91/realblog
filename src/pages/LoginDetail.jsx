import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function LoginDetail() {
  return (
    <Container maxWidth="lg">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
   
    >
    <TextField
  id="authorName"
  name="EmailID"
  label="Email-Id"
  placeholder="Enter author name"
  required
  variant="outlined"
  sx={{ width: '400px' }} 
/>

    </Box>

    </Container>
  );
}
