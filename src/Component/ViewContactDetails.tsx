import React from 'react';
import {  Typography, IconButton, Dialog, DialogTitle, DialogContent, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Contact } from '../types/contact';

interface ViewContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

const ViewContactDetails: React.FC<ViewContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Contact Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={1} sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {contact.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {contact.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Number:</strong> {contact.phoneNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {contact.address}
          </Typography>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default ViewContactDetails;