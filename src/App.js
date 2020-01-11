import React, { Component } from "react";
import Header from "./components/Header/Header";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import ItemStatusFilter from "./components/ItemStatusFilter/ItemStatusFilter";
import TodoListContainer from "./containers/TodoListContainer/TodoListContainer";
import NewItemInput from "./components/NewItemInput/NewItemInput";
import "./index.css";

export default class App extends Component {
  state = {
    todoList: [
      { label: "Drink cofee", important: false, done: false, id: 1 },
      { label: "Have a nice day", important: true, done: false, id: 2 },
      { label: "Learn React", important: true, done: false, id: 3 }
    ],
    term: "",
    filter: "active"
  };

  deleteItem = id => {
    this.setState(({ todoList }) => {
      return {
        todoList: todoList.filter(item => item.id !== id)
      };
    });
  };

  addNewItem = newValue => {
    const newItem = newValue;

    console.log(newItem);
    this.setState(({ todoList }) => {
      let maxId = todoList.reduce(
        (max, elem) => (elem.id > max ? elem.id : max),
        todoList[0].id
      );
      maxId++;

      const updatedList = [...todoList, { label: newItem, id: maxId }];
      return {
        todoList: updatedList
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(el => el.id === id);

      const oldItem = todoList[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newTodoList = [
        ...todoList.slice(0, index),
        newItem,
        ...todoList.slice(index + 1)
      ];
      return {
        todoList: newTodoList
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(el => el.id === id);

      const oldItem = todoList[index];
      const newItem = { ...oldItem, important: !oldItem.important };

      const newTodoList = [
        ...todoList.slice(0, index),
        newItem,
        ...todoList.slice(index + 1)
      ];
      return {
        todoList: newTodoList
      };
    });
  };

  onSearch = term => {
    this.setState({ term });
  };

  searchItem = (todoData, term) => {
    if (term.length === 0) {
      return todoData;
    }
    return todoData.filter(
      item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  filterItem = (todoData, filter) => {
    switch (filter) {
      case "active":
        return todoData.filter(item => !item.done);
      case "done":
        return todoData.filter(item => item.done);
      default:
        return todoData;
    }
  };

  render() {
    const doneCount = this.state.todoList.filter(item => item.done).length;
    const todoCount = this.state.todoList.length - doneCount;
    const { todoList, term, filter } = this.state;

    const visiableItems = this.searchItem(todoList, term);
    const visiableAndFilteredItem = this.filterItem(visiableItems, filter);

    return (
      <div className="todo-app">
        <Header todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter filter={filter} onFilter={this.onFilter} />
        </div>

        <TodoListContainer
          todos={visiableAndFilteredItem}
          onDeleted={id => this.deleteItem(id)}
          onToggleDone={id => this.onToggleDone(id)}
          onToggleImportant={id => this.onToggleImportant(id)}
        />
        <NewItemInput addNewItem={this.addNewItem} />
      </div>
    );
  }
}
