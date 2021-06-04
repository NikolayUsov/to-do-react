import React from 'react';

import './item-status-filter.css';
import '../index.js';

const SortView = {
  ALL: 'All',
  ACTIVE: 'Active',
  DONE: 'Done',
}

export default class ItemStatusFilter extends React.Component{

  render() {
    const { filterChange } = this.props
    return (
      <div onClick ={(evt) => {filterChange(evt.target.dataset.filter)}} className="btn-group">
        <button type="button"
                data-filter = {SortView.ALL}
                className="btn btn-info">All</button>
        <button type="button"
                data-filter = {SortView.ACTIVE}
                className="btn btn-outline-secondary">Active</button>
        <button type="button"
                data-filter = {SortView.DONE}
                className="btn btn-outline-secondary">Done</button>
      </div>
    );
  }
}
