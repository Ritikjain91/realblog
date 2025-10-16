import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogCard = ({ 
  title = "No Title", 
  author = "Unknown Author", 
  content = "No content available", 
  createdAt, 
  _id,
  onDelete
}) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;
  console.log("API_BASE_URL:", API_BASE_URL);

  
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });
  
  // Ensure content is a string before calling .length
  const safeContent = typeof content === 'string' ? content : "No content available";
  
  // Truncate content for preview
  const truncatedContent = safeContent.length > 150 
    ? `${safeContent.substring(0, 150)}...` 
    : safeContent;

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${_id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Check if response is OK before parsing JSON
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        // Show success message
        setSnackbar({
          open: true,
          message: "Blog deleted successfully!",
          severity: "success"
        });
        
        // Call the onDelete callback to update the parent component
        if (onDelete) {
          onDelete(_id);
        }
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Failed to delete blog",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error"
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}>
        {/* Delete Button */}
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <IconButton 
            size="small" 
            color="error" 
            onClick={handleDeleteClick}
            aria-label="delete blog"
            disabled={loading}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'error.light',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 4 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '64px'
            }}
          >
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {author} • {formatDate(createdAt)}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ mt: 2 }}
            color="text.primary"
          >
            {truncatedContent}
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ fontWeight: 600 }}
          >
            Read More
          </Button>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={loading ? undefined : handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the blog post "<strong>{title}</strong>"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleDeleteCancel} 
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogCard;