import React from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight={600}>
        Blog #{id}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is the detailed page for blog number {id}. Later, we can fetch and display content from backend here.
      </Typography>
    </Container>
  );
};

export default BlogDetail;
