import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { Wrapper } from './Phonebook.styled';
import {
  Notification,
  noContactsNotify,
  noMatchesNotify,
} from 'components/Notification/Notification';

const initialLocalStorage = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class Phonebook extends Component {
  state = {
    contacts: initialLocalStorage,
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) this.setState({ contacts: savedContacts });
    if (savedContacts && savedContacts.length === 0) {
      noContactsNotify();
    } else if (!savedContacts && localStorage.contacts) {
      noContactsNotify();
    }
  }

  componentDidUpdate(prevState, prevProps) {
    const { contacts } = this.state;
    if (contacts.length === 0) {
      noContactsNotify();
    }
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notification(name);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(4), name, number }],
      };
    });
  };

  handleFilter = e => {
    return this.setState({ filter: e.currentTarget.value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    if (filtered.length === 0 && filter) {
      noMatchesNotify();
    }
    return filtered;
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <Wrapper>
        <Section title="Phonebook">
          <ContactForm onFormSubmit={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <ContactFilter value={filter} onFilterChange={this.handleFilter} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </Wrapper>
    );
  }
}
