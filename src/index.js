import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import AddNewItem from './components/add-new-item.js'
import './index.css';


const SortView = {
  ALL: 'All',
  ACTIVE: 'Active',
  DONE: 'Done',
}

const todoData = [
  { label: 'Drink Coffee', important: false, id: 1, isDone: false, },
  { label: 'Make Awesome App', important: true, id: 2,isDone: false, },
  { label: 'Have a lunch', important: false, id: 3, isDone: false, }
];

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todoData: todoData,
      newTaskText: '',
      sortView: SortView.ALL,
    }

    
    this._doneTasks = this.state.todoData.slice().filter(elem => elem.isDone);
    this._activeTasks = this.state.todoData.slice().filter(elem => !elem.isDone);
    this._onDelete = this._onDelete.bind(this);
    this._onAddNewTask = this._onAddNewTask.bind(this);
    this._onInputNewTask = this._onInputNewTask.bind(this);
    this._getRenderedTsk = this._getRenderedTsk.bind(this);
    this._onChangeFilterType = this._onChangeFilterType.bind(this);
  }



  _onInputNewTask(value){
    this.setState({newTaskText: value})
  }

  _onDelete(id){
    console.log(id)
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(elem => elem.id === id);
      const newArr = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx+1),
      ];

      return {todoData: newArr}
    })
    
  }

  _onAddNewTask(){
    if(!this.state.newTaskText){
      return
    }

    this.setState(({ todoData }) => {
      const newTask = {
        label: this.state.newTaskText,
        id: todoData.length+1,
        import: false,
        isDone: false,
      };
      const newArr = [...todoData, newTask];
      return {todoData: newArr,
              newTaskText: '',}
    })
  }

  _getRenderedTsk(){
   const  {todoData} = this.state
    switch(this.state.sortView){
      case SortView.DONE:
        return todoData.slice().filter(elem => elem.isDone)
      case SortView.ACTIVE:
        return todoData.slice().filter(elem => !elem.isDone); 
      
      default: return todoData.slice();
    }
}

  _onChangeFilterType(type){
    this.setState({sortView: type})
  }

  render(){
   console.log(this.state);
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={2} />
        <div className="top-panel d-flex">
          <SearchPanel onChangeInput = {this._onInputNewTask} value={this.state.newTaskText}/>
          <ItemStatusFilter filterChange = {this._onChangeFilterType}/>
        </div>
  
        <TodoList 
        onDeleted = {this._onDelete}
        todos={this._getRenderedTsk()} />
        <AddNewItem onAddItem = { this._onAddNewTask}/>
      </div>
  
    );
  }
}

ReactDOM.render(<App></App>,
  document.getElementById('root'));