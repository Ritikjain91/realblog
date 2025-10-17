import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,

  Dialog,
  DialogTitle,
  DialogContent,
  
  DialogActions,

  Snackbar,
  Alert,

} from "@mui/material";

const BlogCard = ({ 
  title = "No Title", 
  author = "Unknown Author", 
  content = "No content available", 
  createdAt, 
  _id,

}) => {
  
  
  const [readMoreDialogOpen, setReadMoreDialogOpen] = React.useState(false); // New state for Read More
 
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

  // Handle Read More click
  const handleReadMoreClick = () => {
    setReadMoreDialogOpen(true);
  };

  const handleReadMoreClose = () => {
    setReadMoreDialogOpen(false);
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
            onClick={handleReadMoreClick} // Add click handler
          >
            Read More
          </Button>
        </CardActions>
      </Card>

      {/* Read More Dialog */}
      <Dialog
        open={readMoreDialogOpen}
        onClose={handleReadMoreClose}
        aria-labelledby="read-more-dialog-title"
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            minHeight: '60vh'
          }
        }}
      >
        <DialogTitle id="read-more-dialog-title" sx={{ 
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h5" component="h2" fontWeight="600">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            By {author} • {formatDate(createdAt)}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            {safeContent}
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleReadMoreClose} 
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

     
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