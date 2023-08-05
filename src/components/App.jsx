import React, { useState, useEffect } from "react";
import ContactForm from "./phoneBook/ContactForm";
import ContactList from "./phoneBook/ContactList";
import Filter from "./phoneBook/Filter";
import "./phoneBook/phonebook.css";

export const App = () => {

  let lastState = localStorage.getItem("contacts");

  if (lastState === "[]") {
    lastState = null;
  }

  const [contacts, setContacts] = useState(
    JSON.parse(lastState) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
    
  const [filter, setFilter] = useState("");
  
  // При оновлені
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevValue => [...prevValue, newContact]);
  }

  const deleteContact = id => {
    setContacts(prevValue => prevValue.filter(contact => contact.id !== id));
  }

  const handleFilterChange = evt => {
    const filterValue = evt.target.value;
    setFilter({
      filter: filterValue
    });
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <div className="main">
      <div className="first-wrap">
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={addContact} />
      </div>

      <div className="second-wrap">
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <ContactList contacts={filteredContacts()} onDelete={deleteContact} />
      </div>
    </div>
  );

}
