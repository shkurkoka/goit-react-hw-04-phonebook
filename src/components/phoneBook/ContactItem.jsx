import React from "react";

const ContactItem = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button className="delete" onClick={() => onDelete(contact.id)}>
        Delete
      </button>
    </li>
  );
};

export default ContactItem;