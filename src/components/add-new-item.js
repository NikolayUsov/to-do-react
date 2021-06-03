import React from "react"

export default class AddNewItem extends React.Component {

    render(){
    const {onAddItem} = this.props
    return(
        <button 
        onClick = {onAddItem}
        className = {'mt-2 btn btn-outline-secondary'}
        >Add new Task</button>
        )
    }
}