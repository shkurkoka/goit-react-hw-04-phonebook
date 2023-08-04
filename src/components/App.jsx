import React, { Component } from "react";
import ContactForm from "./phoneBook/ContactForm";
import ContactList from "./phoneBook/ContactList";
import Filter from "./phoneBook/Filter";
import "./phoneBook/phonebook.css";

export class App extends Component {

  constructor(props) {
    super(props);

    let lastState = localStorage.getItem("contacts");

    if (lastState === "[]") {
      lastState = null;
    }

    this.state = {
      contacts: JSON.parse(lastState) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: "",
    };
  }


  componentDidUpdate() {
    localStorage.clear();
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }

  handleFilterChange = evt => {
    const filterValue = evt.target.value;
    this.setState({
      filter: filterValue
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="main">
        <div className="first-wrap">
          <h1>Phonebook</h1>
          <ContactForm contacts={contacts} onSubmit={this.addContact} />
        </div>

        <div className="second-wrap">
          <h2>Contacts</h2>
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />
          <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
        </div>
      </div>
    );
  }
}
