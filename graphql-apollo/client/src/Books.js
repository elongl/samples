import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
const GET_BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

class Books extends Component {
  state = { newBook: { title: '', author: '' } };
  render() {
    const { newBook } = this.state;
    return (
      <div>
        <h1>Your Books</h1>
        <ul>
          <Query query={GET_BOOKS}>
            {({ data, loading }) =>
              !loading &&
              data.books.map(book => (
                <li key={book.title} style={{ fontSize: '1.5rem' }}>
                  {book.title} Was Written By {book.author}
                </li>
              ))
            }
          </Query>
        </ul>

        <input
          style={{ fontSize: '1.2rem' }}
          placeholder="Book's Name"
          value={newBook.title}
          onChange={({ currentTarget }) =>
            this.setState({ newBook: { ...newBook, title: currentTarget.value } })
          }
        />
        <input
          style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}
          placeholder="Book's Author"
          value={newBook.author}
          onChange={({ currentTarget }) =>
            this.setState({ newBook: { ...newBook, author: currentTarget.value } })
          }
        />
        <Mutation
          mutation={ADD_BOOK}
          update={(cache, { data: { addBook } }) => {
            const { books } = cache.readQuery({ query: GET_BOOKS });
            cache.writeQuery({ query: GET_BOOKS, data: { books: [...books, addBook] } });
          }}
        >
          {addBook => (
            <button
              style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}
              onClick={() => addBook({ variables: newBook })}
            >
              Add Book
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Books;
