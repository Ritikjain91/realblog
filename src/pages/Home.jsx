import React, { useState, useEffect } from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  CircularProgress,
  Alert,
  Box,
  Snackbar 
} from "@mui/material";
import BlogCard from "../pages/BlogCard";

const Home = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
   console.log("API_BASE_URL:", API_BASE_URL);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      
      // ✅ Add /api to the URL
      const res = await fetch(`${API_BASE_URL}/api/blogs`);
      
      console.log("Fetching from:", `${API_BASE_URL}/api/blogs`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      console.log("API Response:", result);
      
      if (result.success) {
        const blogsData = result.data || [];
        setBlogs(blogsData);
      } else {
        setError(result.message || "Failed to fetch blogs");
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(`Failed to load blogs: ${err.message}`);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogDelete = (deletedBlogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== deletedBlogId));
    setSnackbar({
      open: true,
      message: "Blog deleted successfully!",
      severity: "success"
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Latest Blogs
      </Typography>
      
      {/* Debug Info - Remove after testing */}
      <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          API URL: {API_BASE_URL}/api/blogs | Blogs loaded: {blogs.length}
        </Typography>
      </Box>
      
      {blogs.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No blogs found. Be the first to create one!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard 
                title={blog.title || "No Title"}
                author={blog.author || "Unknown Author"}
                content={blog.content || "No content available"}
                createdAt={blog.createdAt || new Date()}
                _id={blog._id}
                onDelete={handleBlogDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Home;