import React, { useState } from "react";
import PropTypes from "prop-types";
import '../index.css';

/**
 * Search Component
 * 
 * A search input with a reset button.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.placeholder - The placeholder text for the search input.
 * @param {function} props.onSearch - The function to call when a search is performed.
 * @param {function} props.onReset - The function to call when the search is reset.
 * 
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({ placeholder, onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission for search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  // Handle reset button click
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