import { Contact } from '../types/contact';
import contactData from '../Data/contact.json';

export const getContacts = (): Promise<Contact[]> => {
   
  return new Promise((resolve) => {
    setTimeout(() => resolve(contactData), 500);  
  });
};