import React from "react"

export default class AddNewItem extends React.Component {
    constructor(){
        super();
        this.state = {
            labelValue: '',
        }
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeLabel = this._onChangeLabel.bind(this);
    }

    _onChangeLabel(evt) {
        this.setState({labelValue: evt.target.value})
    }

    _onSubmit(evt){
        evt.preventDefault();
        this.props.onAddItem(this.state.labelValue)
        this.setState({labelValue: ''})
    }

    render(){
   
    return(
        <form 
        onSubmit = {this._onSubmit}
        className ='item-add-form d-flex mt-3'>
            <input type = 'text'
                className = {'form-control'}
                onChange = {this._onChangeLabel}
                placeholder = 'What we do today'
                value = {this.state.labelValue}
            />
            <button 
        type = {'submit'}
        className = {'btn btn-outline-secondary'}
        >Add new Task</button>
        </form>
        )
    }
}