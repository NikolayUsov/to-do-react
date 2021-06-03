import React from 'react';

import './todo-list-item.css';


export default class TodoListItem  extends React.Component{
  constructor(){
    super()
    this.state = {
      done: false,
      important: false,
    }
    this._onLabelClick = this._onLabelClick.bind(this)
    this._onImportantClick = this._onImportantClick.bind(this);
  }

  _onLabelClick() {
    this.setState((prefState) => ({done: !prefState.done}))
  }
 

  _onImportantClick() {
    this.setState((prefState) => ({important: !prefState.important}))
  }

  render(){
    const  { label, onDeleted,  } = this.props;
    const { done, important} = this.state;
    const classNameDone = ' done'
    const classNameImportant = ' important'
    let className = 'todo-list-item';
    if(done) {
      className = className + classNameDone;
    }

    if(important) {
      className = className + classNameImportant;
    }

    return (
      <span className={className}>
        <span
          className = {'todo-list-item-label'}
          onClick = {this._onLabelClick}
          >
          {label}
        </span>
  
        <button type="button"
                onClick = {this._onImportantClick}
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

