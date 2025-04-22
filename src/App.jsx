import React from 'react';
import Header from './Header';
import './App.css';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './About';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Header />
          <div className="main-content">
            <Routes>
              <Route 
                exact path="/"
                element={<BestBooks />
                }
              />
               <Route 
                exact path="/about"
                element={<About />
                }
              />{/* Add About route here later */}
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
