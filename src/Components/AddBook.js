import React, { Component } from 'react';
import '../App.css';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdd: false };
  }

  onSubmit = event => {
    event.preventDefault();
    if (this.props.validation(this.titleInput.value, this.dateInput.value, this.authorInput.value) === true) {
      const formatName = this.props.numbersLettersPipe(this.titleInput.value);
      this.props.onAdd(formatName, this.dateInput.value, this.authorInput.value);

      this.titleInput.value = '';
      this.dateInput.value = '';
      this.authorInput.value = '';
      this.setState({ isAdd: !this.state.isAdd });
    }
  };

  addInputReveal = () => {
    this.setState({ isAdd: !this.state.isAdd });
  };

  render() {
    return (
      <span>
        {this.state.isAdd ? (
          <form onSubmit={this.onSubmit}>
            <h3>Add A New Book</h3>
            <input placeholder="Book Name" ref={titleInput => (this.titleInput = titleInput)} />
            <input placeholder="D/M/YYYY" ref={dateInput => (this.dateInput = dateInput)} />
            <input placeholder="Author Name" ref={authorInput => (this.authorInput = authorInput)} />
            <div>
              <button>Add</button>
            </div>
            <div onClick={this.addInputReveal}>
              <i className="fa fa-minus" />
            </div>
            <hr />
          </form>
        ) : (
          <span onClick={this.addInputReveal}>
            <i className="fa fa-plus" />
          </span>
        )}
      </span>
    );
  }
}

export default AddBook;
