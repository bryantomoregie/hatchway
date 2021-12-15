import React from "react";
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
