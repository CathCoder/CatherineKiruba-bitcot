 import React, { useState } from 'react';
import { Contact } from '../types/contact';
import { TextField } from '@mui/material';

interface SearchContactProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const SearchContact: React.FC<SearchContactProps> = ({ contacts, setContacts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setContacts(contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.phoneNumber.includes(term)
    ));
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      label="Search Contact"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchContact;