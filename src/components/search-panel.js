import React from 'react';

import './search-panel.css';

const SearchPanel = ({ value, onChangeInput }) => {
  return (
    <input type="text"
              value = {value}
              onChange = {(evt)=> onChangeInput(evt.target.value)}
              className="form-control search-input"
              placeholder="type to search" />
  );
};

export default SearchPanel;
