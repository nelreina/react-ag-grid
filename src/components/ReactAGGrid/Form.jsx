import React from 'react';

/* eslint-disable react/prop-types */

const Form = ({ search, textChange, clearFilter, searchText, loading }) => (
  <form onSubmit={search} className="common-export-grid-form">
    <input
      disabled={loading}
      type="text"
      value={searchText}
      placeholder="Type to Filter..."
      onChange={textChange}
    />
    <button disabled={loading}>Filter</button>
    <a
      href="0"
      disabled={loading}
      className={loading ? 'disabled' : ''}
      onClick={clearFilter}
    >
      Clear Filter
    </a>
  </form>
);
export default Form;
