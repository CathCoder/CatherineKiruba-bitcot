import React, { useState } from 'react';
import { Contact } from '../types/contact';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface AddContactProps {
    onAdd: (contact: Contact) => void;
    onClose: () => void;
  }
  
  const AddContact: React.FC<AddContactProps> = ({ onAdd, onClose }) => {
    const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewContact((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
      const contact: Contact = { ...newContact, id: Date.now() };
      onAdd(contact);
      setNewContact({ name: '', email: '', phoneNumber: '', address: '' });
      onClose();
    };
  
    const handleReset = () => {
      setNewContact({ name: '', email: '', phoneNumber: '', address: '' });
    };
  
    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Name" name="name" value={newContact.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" value={newContact.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" value={newContact.phoneNumber} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Address" name="address" value={newContact.address} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} sx={{ backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            Reset
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddContact;