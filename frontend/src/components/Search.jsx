import React, { useState } from "react";
import PropTypes from "prop-types";
import '../index.css';

const Search = ({ placeholder, onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleReset = () => {
    setQuery("");
    if (onReset) {
      onReset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-button submit-button">Search</button>
      <button type="button" className="search-button reset-button" onClick={handleReset}>Reset</button>
    </form>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

Search.defaultProps = {
  placeholder: "Search...",
};

export default Search;