# Routing

- Adding React Router
- Adding Routes
- Adding the NavBar
- Linking to the MovieForm
- https://devalice.tistory.com/112

## Routing: Adding React Router

```cmd
npm install react-router-dom
npm install react-router-container
```

## Routing: Adding Routes

`BrowserRouter` 컴포넌트는 브라우저의 `History Object`에 리엑트 컴포넌트가 접근할 수 있도록 `Component Tree`로 전달하는 역할을 합니다.

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

```javascript
// src/App.js
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";

import "./App.css";

import Movies from "./components/Movies";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Routing: Adding the NavBar

```javascript
// src/components/NavBar.jsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Prevent Refreshing
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Vidly Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customers">
              <Nav.Link>Customers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rentals">
              <Nav.Link>Rentals</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
```

```javascript
// src/App.js
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";

import "./App.css";

import Movies from "./components/Movies";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

## Routing: Linking to the MovieForm

```javascript
// src/App.js
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";

import "./App.css";

import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path=":movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
```

```javascript
// src/components/MovieForm.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  let navigate = useNavigate();
  let params = useParams();

  return (
    <div className="container">
      <h1>Movie Form {params.movieId} </h1>
      <button className="btn btn-primary" onClick={() => navigate("/movies")}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
```
