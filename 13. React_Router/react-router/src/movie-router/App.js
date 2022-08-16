//www.cluemediator.com/how-to-access-url-parameters-in-the-class-component-using-react-router-v6

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "../App.css";

import Home from "./Home";
import Movie from "./Movie";

function App() {
  return (
    <Router>
      <h1>Header</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie">
          <Route path=":movieId" element={<Movie />} />
        </Route>
      </Routes>
      <h1>Footer</h1>
    </Router>
  );
}

export default App;
