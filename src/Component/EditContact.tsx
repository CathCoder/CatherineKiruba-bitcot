import React, { useState } from 'react';
import { Contact } from '../types/contact';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface EditContactProps {
  contact: Contact;
  onClose: () => void;
  onUpdate: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const EditContact: React.FC<EditContactProps> = ({ contact, onClose, onUpdate }) => {
  const [editedContact, setEditedContact] = useState<Contact>(contact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate((prevContacts) =>
      prevContacts.map((c) => (c.id === editedContact.id ? editedContact : c))
    );
    onClose();
  };

  const handleReset = () => {
    setEditedContact(contact);  
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={editedContact.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={editedContact.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={editedContact.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={editedContact.address}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} sx={{ backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
          Reset
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContact;
