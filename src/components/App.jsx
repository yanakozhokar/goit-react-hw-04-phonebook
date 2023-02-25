import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({
        contacts: savedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onFilterChange = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  filterHandler = () => {
    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(this.state.filter);
    });
  };

  addContact = newContact => {
    const { name, number } = newContact;
    const isExist = this.state.contacts.some(contact => {
      return contact.name === name;
    });

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState({
      contacts: [...this.state.contacts, { id: nanoid(), name, number }],
    });
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <Container>
        <div>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter onFilterChange={this.onFilterChange} />
          <ContactList
            filteredContacts={this.filterHandler()}
            deleteContact={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}

export default App;
