import React from "react";

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;