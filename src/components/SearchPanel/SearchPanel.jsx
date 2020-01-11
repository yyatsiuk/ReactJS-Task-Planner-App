import React, { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    term: ""
  };

  onInputChange = event => {
    const term = event.target.value;
    this.setState({ term });

    this.props.onSearch(term);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onInputChange}
        value={this.state.term}
      />
    );
  }
}
