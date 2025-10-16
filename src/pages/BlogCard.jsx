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
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogCard = ({ 
  title = "No Title", 
  author = "Unknown Author", 
  content = "No content available", 
  createdAt, 
  _id,
  onDelete // Add this prop for delete callback
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  
  // Ensure content is a string before calling .length
  const safeContent = typeof content === 'string' ? content : "No content available";
  
  // Truncate content for preview
  const truncatedContent = safeContent.length > 150 
    ? safeContent.substring(0, 150) + "..." 
    : safeContent;

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${_id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        // Call the onDelete callback to update the parent component
        if (onDelete) {
          onDelete(_id);
        }
      } else {
        console.error("Delete failed:", result.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Delete Button */}
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton 
            size="small" 
            color="error" 
            onClick={handleDeleteClick}
            aria-label="delete blog"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {author} • {formatDate(createdAt)}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            {truncatedContent}
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button size="small" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Blog
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the blog "{title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogCard;