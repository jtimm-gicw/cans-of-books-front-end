import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import bookImg from './book.png';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      errorMessage: ''
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

  closeError = () => {
    this.setState({ errorMessage: '' });
  };

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning & Formation Shelf</h2>
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
                    fluid
                  />
                  <Carousel.Caption id="carousel-text-box">
                    <h2 className="carousel-text">{book.title}</h2>
                    <p className="carousel-text">{book.description}</p>
                    <p className="carousel-text">Status: {book.status}</p>
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