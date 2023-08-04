import React, { Component } from "react";
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const { name, number } = this.state;
    const id = nanoid();
    
    const isNameExists = this.props.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameExists) {
      alert("Contact with this name already exists in the phonebook.");
      return;
    }

    this.props.onSubmit({ id, name, number });
    form.reset();
  }

  handleInputChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="input-name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={this.state.name}
          onChange={this.handleInputChange}
          required
        />
        <label htmlFor="number">Phone Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={this.state.number}
          onChange={this.handleInputChange}
          required
        />
        <button type="submit" className="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;