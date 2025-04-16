import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect  >
        <Navbar.Brand><p>&copy; Jason Timm</p></Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
