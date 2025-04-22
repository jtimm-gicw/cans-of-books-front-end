import React from 'react';
import axios from 'axios';
import './App.css';
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import bookImg from './book.png';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: '',
      showForm: false,
    };
  }

  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: import.meta.env.VITE_SERVER_URL, // ✅ Make sure your .env uses this
        url: '/books'
      };
      const response = await axios(config);
      this.setState({
        books: response.data,
        errorMessage: ''
      });
    } catch (error) {
      console.error('Error in componentDidMount', error);
      this.setState({
        errorMessage: `statusCode ${error.response?.status}: ${error.response?.data || 'Something went wrong'}`
      });
    }
  };

  createBook = async(newBook) =>{
    try {
      const config = {
        method: 'post',
        baseURL: import.meta.env.VITE_SERVER_URL, // ✅ Make sure your .env uses this
        url: '/books',
        data: newBook,
      };
      const bookResults = await axios(config);
      const updatedBooks= [...this.state.books, bookResults.data];
      this.setState({books: updatedBooks});
    } catch (error) {
      console.error('Error BestBooks', error);
      this.setState({
        errorMessage: `statusCode ${error.response?.status}: ${error.response?.data || 'Something went wrong'}`
      });
    }
  };

  deleteBook = async(bookToBeDeleted) =>{
    try {
      const proceed= window.confirm(`Do you want to delete${bookToBeDeleted.title}`); //makes a popup page
      if (proceed) {
      const config = {
        method: 'delete',
        baseURL: import.meta.env.VITE_SERVER_URL, // ✅ Make sure your .env uses this
        url: `/books/${bookToBeDeleted_id}`,
      };

          await axios(config);
      let newBooks= this.state.books.filter((book) => {
        book._id !== bookToBeDeleted._id;
      this.setState({books: newBooks});
    });
      
    }} catch (error) {
      console.error('Error newBooks', error);
      this.setState({
        errorMessage: `statusCode ${error.response?.status}: ${error.response?.data || 'Something went wrong'}`
      });
    }
  };

  closeBookFormModal = () => {
    this.setState({ showForm: false });
  };

  closeError = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning & Formation Shelf</h2>
        <Button id="addBookButton" className= "button" onClick= {()=> this.setState({showForm: true})}>Add a Book</Button>
        {this.state.showForm && (
          <BookFormModal 
                show={this.state.showForm}
                handleClose = {this.closeBookFormModal}
                createBook= {this.createBook}
          />
        )}
        <Container>
          {this.state.books.length ? (
            <Carousel id="carousel">
              {this.state.books.map(book => (
                <Carousel.Item key={book._id}>
                  <Image
                    id="Images"
                    className="carousel-img"
                    src={bookImg}
                    alt={book.title}

                  />
                  <Carousel.Caption id="carousel-text-box">
                    <h3 className="carousel-text">{book.title}</h3>
                    <p className="carousel-text">{book.description}</p>
                    <p className="carousel-text">Status: {book.status}
                      <Button onClick= {()=> this.deleteBook(book)}></Button>
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h3>No Books Found :</h3>
          )}
        </Container>
      </>
    );
  }
}

export default BestBooks;