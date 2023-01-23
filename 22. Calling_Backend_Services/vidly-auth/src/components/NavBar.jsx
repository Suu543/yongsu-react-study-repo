import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Prevent Refreshing
import { LinkContainer } from "react-router-bootstrap";

const NavBar = ({ user }) => {
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

            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            {user && (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>{user.name}</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
