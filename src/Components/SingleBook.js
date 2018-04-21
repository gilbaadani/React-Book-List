import React, { Component } from 'react';
import '../App.css';

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  onEdit = () => {
    this.setState({ isEdit: true });
  };

  onEditSubmit = event => {
    event.preventDefault();
    if (this.props.validation(this.titleInput.value, this.dateInput.value, this.authorInput.value) === true) {
      this.props.onEditSubmit(this.titleInput.value, this.dateInput.value, this.authorInput.value, this.props.title);
      this.setState({ isEdit: false });
    }
  };

  cancelEdit = event => {
    event.preventDefault();
    this.setState({ isEdit: false });
  };

  onDelete = () => {
    const { onDelete, title } = this.props;
    onDelete(title);
  };
  render = () => {
    const { title, date, author } = this.props;

    return (
      <span key={title}>
        {this.state.isEdit ? (
          <form className="singleBookWrapper" onSubmit={this.onEditSubmit}>
            <input defaultValue={title} type="text" ref={titleInput => (this.titleInput = titleInput)} />
            <input defaultValue={date} type="text" ref={dateInput => (this.dateInput = dateInput)} />
            <input defaultValue={author} type="text" ref={authorInput => (this.authorInput = authorInput)} />
            <div>
              <button>save</button>
              <button onClick={this.cancelEdit}>cancel</button>
            </div>
          </form>
        ) : (
          <span className="singleBookWrapper">
            <span className="bookTitle">{title}</span>
            <span className="bookDetails">Release Date:{date}</span>
            <span className="bookDetails">Author: {author}</span>
            <div>
              <span onClick={this.onEdit}>
                {' '}
                <i className="fa fa-edit" />{' '}
              </span>
              <span onClick={this.onDelete}>
                {' '}
                <i className="fa fa-trash" />{' '}
              </span>
            </div>
          </span>
        )}
      </span>
    );
  };
}

export default SingleBook;
