import React, { useState } from "react";
import "./styles/search.css";

export const Search = ({ setName, setTag, name, tag }) => {
  const handleNameChange = (char) => {
    setName(char);
  };

  const handleTagChange = (char) => {
    setTag(char);
  };

  return (
    <div>
      <input
        placeholder="Search by name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <input
        placeholder="Search by tag"
        value={tag}
        onChange={(e) => handleTagChange(e.target.value)}
      />
    </div>
  );
};

/**
 Maybe from here, we can change every output to lowercase, then send that over to the parent
 Once ther we can change every first name and last name to lowercase
 Then search both
 */
