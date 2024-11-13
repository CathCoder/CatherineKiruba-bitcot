import React, { useState, useEffect } from 'react';
import { getContacts } from '../Services/contactsServices';
import { Contact } from '../types/contact';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ViewContactDetails from './ViewContactDetails';
import { Box, Card, CardContent, IconButton, Typography, TextField, Avatar, Dialog } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ContactsView: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tempContacts, setTempContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getContacts().then((data) => {
      setContacts(data);
      setTempContacts(data);
    });
  }, []);

  const handleDelete = (id: number) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    setTempContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setContacts(tempContacts);
    } else {
      setContacts(
        tempContacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(term) ||
            contact.phoneNumber.includes(term)
        )
      );
    }
  };

  const handleEditClose = (updatedContact?: Contact) => {
    if (updatedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      setContacts(updatedContacts);
      setTempContacts(updatedContacts);
    }
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700, backgroundColor: '#f5f5f5' }}>
      <Box sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#000',
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
          color: '#fff',
          overflowY: 'auto',
        }}>
        <Card sx={{ backgroundColor: '#87CEFA', padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            All Contacts
          </Typography>
          <IconButton color="primary" onClick={() => setIsAdding(true)} sx={{ color: '#fff' }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
          <TextField
            label="Search Contact"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 1,
              input: { color: '#000' },
            }}
          />
        </Box>
        <Box>
          {contacts.map((contact, index) => (
            <Card key={contact.id} sx={{ margin: '8px 0', padding: '4px', backgroundColor: '#fff', color: '#000', borderRadius: 1 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '8px 12px !important' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{index + 1}</Typography>
                <Avatar sx={{ width: 30, height: 30, bgcolor: '#87CEFA', color: '#000' }}>{contact.name.charAt(0)}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" noWrap>
                    {contact.name}
                  </Typography>
                  <Typography variant="body2">{contact.phoneNumber}</Typography>
                </Box>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedContact(contact);
                    setIsViewing(true);
                  }}
                  size="small"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setSelectedContact(contact);
                    setIsEditing(true);
                  }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(contact.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        {isViewing && selectedContact && (
          <Dialog open={isViewing} onClose={() => setIsViewing(false)} maxWidth="xs" fullWidth>
            <ViewContactDetails contact={selectedContact} onClose={() => setIsViewing(false)} />
          </Dialog>
        )}

        {isEditing && selectedContact && (
          <Dialog open={isEditing} onClose={() => handleEditClose()} maxWidth="xs" fullWidth>
            <EditContact contact={selectedContact} onClose={handleEditClose} onUpdate={setContacts}  />
          </Dialog>
        )}

        {isAdding && (
          <Dialog open={isAdding} onClose={() => setIsAdding(false)} maxWidth="xs" fullWidth>
            <AddContact
              onAdd={(newContact) => {
                setContacts((prev) => [...prev, newContact]);
                setTempContacts((prev) => [...prev, newContact]);
                setIsAdding(false);
              }}
              onClose={() => setIsAdding(false)}
            />
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default ContactsView;