import React, { Component } from 'react';
import '../App.css';
import moment from 'moment';
import SingleBook from './SingleBook';
import AddBook from './AddBook';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { bookList: [] };
  }

  componentWillMount() {
    fetch('data.json')
      .then(response => response.json())
      .then(result => {
        this.uniformFormat(result);
        this.setState({ bookList: result });
      });
  }

  numbersLettersPipe = bookTitle => {
    if (bookTitle.length > 0) {
      let matches = bookTitle.match(/[a-zA-Z0-9]+/g).join(' ');
      let filteredName = this.toTitleCase(matches);
      return filteredName;
    }
  };

  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  uniformFormat = bookList => {
    for (let i = 0; i < bookList.length; i++) {
      bookList[i].title = this.numbersLettersPipe(bookList[i].title);
    }

    this.setState({ bookList });
  };

  dateValidation = str => {
    let d = moment(str, 'D/M/YYYY');
    if (d == null || !d.isValid() || str.match(/[a-z]/g) !== null) return false;

    return (
      str.indexOf(d.format('D/M/YYYY')) >= 0 ||
      str.indexOf(d.format('DD/MM/YYYY')) >= 0 ||
      str.indexOf(d.format('D/M/YY')) >= 0 ||
      str.indexOf(d.format('DD/MM/YY')) >= 0
    );
  };

  stringValidation = str => {
    if (typeof str === 'string' && str.length !== 0) return true;
    else return false;
  };

  validation = (title, date, author) => {
    if (!this.dateValidation(date)) {
      alert('date is invalid!');
      return false;
    } else if (!this.stringValidation(title)) {
      alert('title is invalid!');
      return false;
    } else if (!this.stringValidation(author)) {
      alert('author is invalid!');
      return false;
    } else {
      return true;
    }
  };

  onAdd = (title, date, author) => {
    const bookList = this.state.bookList;
    bookList.unshift({ title, date, author });
    this.setState({ bookList });
  };

  onDelete = title => {
    const bookList = this.state.bookList;
    const filteredbookList = bookList.filter(product => {
      return product.title !== title;
    });

    this.setState({ bookList: filteredbookList });
  };

  onEditSubmit = (title, date, author, originaltitle) => {
    let bookList = this.state.bookList;
    bookList = bookList.map(product => {
      if (product.title === originaltitle) {
        product.title = this.numbersLettersPipe(title);
        product.date = date;
        product.author = author;
      }
      return product;
    });

    this.setState({ bookList });
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-title">List of Books</h1>
        <AddBook onAdd={this.onAdd} validation={this.validation} numbersLettersPipe={this.numbersLettersPipe} />
        <div className="wrapper">
          {this.state.bookList.map(book => {
            return (
              <SingleBook
                className="wrapper"
                key={book.title}
                {...book}
                onDelete={this.onDelete}
                validation={this.validation}
                onEditSubmit={this.onEditSubmit}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
