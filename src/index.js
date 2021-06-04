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
  { label: 'Have a lunch', important: false, id: 3, isDone: false, },
];

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todoData: todoData,
      sortView: SortView.ALL,
      searchPanelValue: '',
    }

    
    this._doneTasks = this.state.todoData.slice().filter(elem => elem.isDone);
    this._activeTasks = this.state.todoData.slice().filter(elem => !elem.isDone);
    this._onDelete = this._onDelete.bind(this);
    this._onAddNewTask = this._onAddNewTask.bind(this);
    this._onInputNewTask = this._onInputNewTask.bind(this);
    this._getRenderedTsk = this._getRenderedTsk.bind(this);
    this._onChangeFilterType = this._onChangeFilterType.bind(this);
    this._onInportantChange = this._onInportantChange.bind(this);
    this._onIsDoneChange = this._onIsDoneChange.bind(this);
    this._onChangeSearchPanel = this._onChangeSearchPanel.bind(this);
  }


  _onInportantChange(id) {

    this.setState((state) => {
      const index = state.todoData.findIndex(elem => id === elem.id);
      const updatedElement = Object.assign({}, state.todoData[index], {important: !state.todoData[index].important});

      const newArr =  [
        ...state.todoData.slice(0, index), 
        updatedElement, 
        ...state.todoData.slice(index+1)
      ];

      return{todoData: newArr}
    })
    
  }

  _onChangeSearchPanel(value){
    if(!value){
      this.setState({searchPanelValue: ''})
      return 
    }

    this.setState({searchPanelValue: value})
  }

  _onIsDoneChange(id) {

    this.setState((state) => {
      const index = state.todoData.findIndex(elem => id === elem.id);
      const updatedElement = Object.assign({}, state.todoData[index], {isDone: !state.todoData[index].isDone});

      const newArr =  [
        ...state.todoData.slice(0, index), 
        updatedElement, 
        ...state.todoData.slice(index+1)
      ];

      return{todoData: newArr}
    })
    
  }

  _onInputNewTask(value){
    this.setState({newTaskText: value})
  }

  _onDelete(id){

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(elem => elem.id === id);
      const newArr = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx+1),
      ];

      return {todoData: newArr}
    })
    
  }

  _onAddNewTask(newLabel){
    if(!newLabel){
      return
    }

    this.setState(({ todoData }) => {
      const newTask = {
        label: newLabel,
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
   let renderedTask = [];
    switch(this.state.sortView){
      case SortView.DONE:
        renderedTask = todoData.slice().filter(elem => elem.isDone);
        break
      case SortView.ACTIVE:
        renderedTask =  todoData.slice().filter(elem => !elem.isDone); 
        break     
      default: renderedTask = todoData.slice();
    }

    console.log(renderedTask, 'rendered')

    if(this.state.searchPanelValue){
      console.log('сортировка по буквам',renderedTask.slice().filter((elem) =>{return elem.label.startsWith(this.state.searchPanelValue)}))
      return renderedTask.slice().filter((elem) =>{return elem.label.startsWith(this.state.searchPanelValue)})
    }

    return renderedTask
}

  _onChangeFilterType(type){
    type = !this.state.searchPanelValue ? type : SortView.BY_TEXT ;
    this.setState({sortView: type})
  }

  render(){
    const  {todoData} = this.state
    return (
      <div className="todo-app">
        <AppHeader toDo={todoData.slice().filter(elem => !elem.isDone).length} done={todoData.slice().filter(elem => elem.isDone).length} />
        <div className="top-panel d-flex">
          <SearchPanel changeValue = {this._onChangeSearchPanel}/>
          <ItemStatusFilter filterChange = {this._onChangeFilterType}/>
        </div>
  
        <TodoList 
        onIsDoneChange = {this._onIsDoneChange}
        onChangeImportant = {this._onInportantChange}
        onDeleted = {this._onDelete}
        todos={this._getRenderedTsk()} />
        <AddNewItem onLabelChange={this._onInputNewTask} onAddItem = { this._onAddNewTask}/>
      </div>
  
    );
  }
}

ReactDOM.render(<App></App>,
  document.getElementById('root'));