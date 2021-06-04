import React from 'react';

import './search-panel.css';
export default class SearchPanel extends React.Component{
constructor(){
  super();
  this.state= {
    labelValue: '',
  }

  this._onInputChange = this._onInputChange.bind(this);
}

_onInputChange(evt){
  this.setState({labelValue: evt.target.value})
  this.props.changeValue(evt.target.value)
}

  render() {
    return (
      <input type="text"
                value = {this.state.labelValue}
                className="form-control search-input"
                placeholder="type to search"
                onChange = {this._onInputChange}
                /> 
    );
  }
}
 

