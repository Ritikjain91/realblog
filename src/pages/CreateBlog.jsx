import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "", // Add author field
    content: "", // Change description to content
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Blog content is required";
    } else if (formData.content.length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the errors above");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          author: formData.author.trim(), // Add author
          content: formData.content.trim(), // Change to content
        }),
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text.substring(0, 100)}`);
      }

      if (res.ok && data.success) {
        setMessage("Blog published successfully!");
        setFormData({
          title: "",
          author: "",
          content: "",
        });
        setErrors({});
      } else {
        setMessage(data.message || `Error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      console.error("Error publishing blog:", err);
      
      if (err.message.includes("Failed to fetch")) {
        setMessage("Network error: Cannot connect to server. Make sure the backend is running.");
      } else if (err.message.includes("Server returned")) {
        setMessage(`Server error: ${err.message}`);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.author.trim() && formData.content.trim();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight={600}
          align="center"
          color="primary"
        >
          Write a New Blog
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Blog Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            disabled={isLoading}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            label="Author Name"
            name="author"
            fullWidth
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            disabled={isLoading}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            label="Blog Content"
            name="content"
            fullWidth
            multiline
            rows={6}
            value={formData.content}
            onChange={handleChange}
            error={!!errors.content}
            helperText={errors.content || "Write your blog content here..."}
            disabled={isLoading}
            sx={{ mb: 3 }}
            required
          />

          <Box sx={{ position: "relative" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid || isLoading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {isLoading ? "Publishing..." : "Publish Blog"}
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>

        {message && (
          <Alert
            severity={
              message.includes("successfully") ? "success" : 
              message.includes("Network error") ? "warning" : "error"
            }
            sx={{ mt: 3 }}
            onClose={() => setMessage("")}
          >
            {message}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default CreateBlog;