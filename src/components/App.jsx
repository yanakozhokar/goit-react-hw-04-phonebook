import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const filterHandler = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter);
    });
  };

  const addContact = newContact => {
    const { name, number } = newContact;
    const isExist = contacts.some(contact => {
      return contact.name === name;
    });

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, { id: nanoid(), name, number }]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onFilterChange={onFilterChange} />
        <ContactList
          filteredContacts={filterHandler()}
          deleteContact={deleteContact}
        />
      </div>
    </Container>
  );
};

export default App;
