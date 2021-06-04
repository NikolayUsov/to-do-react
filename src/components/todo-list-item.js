import React from 'react';

import './todo-list-item.css';


export default class TodoListItem  extends React.Component{

  render(){
    const  { label, important, isDone, onDeleted, onChangeImportant, onIsDoneChange } = this.props;
    const classNameDone = ' done'
    const classNameImportant = ' important'
    let className = 'todo-list-item';

    if(isDone) {
      className = className + classNameDone;
    }

    if(important) {
      className = className + classNameImportant;
    }

    return (
      <span className={className}>
        <span
          className = {'todo-list-item-label'}
          onClick = {onIsDoneChange}
          >
          {label}
        </span>
  
        <button type="button"
                onClick = { onChangeImportant }
                className="btn btn-outline-success btn-sm float-right">
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                onClick = { onDeleted }
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

