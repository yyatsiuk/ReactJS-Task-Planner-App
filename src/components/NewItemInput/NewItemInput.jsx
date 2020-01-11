import React, { Component } from "react";
import "./NewItemInput.css";

export default class NewItemInput extends Component {
  state = {
    inputValue: ""
  };

  onLabelChange = event => {
    const val = event.target.value;
    this.setState({
      inputValue: val
    });
  };

  onSubmitAddNewItemForm = event => {
    event.preventDefault();
    this.props.addNewItem(this.state.inputValue);

    this.setState({
      inputValue: ""
    });
  };

  render() {
    return (
      <form
        className="input-group mb-3 new-item-input"
        onSubmit={this.onSubmitAddNewItemForm}
      >
        <input
          type="text"
          className="form-control input-field-todo"
          placeholder="New Item todo"
          aria-describedby="button-addon1"
          onChange={this.onLabelChange}
          value={this.state.inputValue}
        ></input>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={this.onSubmitAddNewItemForm}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}
