import { Navbar, Container, Nav, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";
import './navigation-bar.scss';

export const NavigationBar = ({ user, query, movies, handleSearch, onLoggedOut }) => {
  return (
<Navbar bg="dark" variant="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand as={Link} to="/">
      <p>Welome to</p>
      <h2>MyFlix</h2>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
        {!user ? (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
          </>
        )}
      </Nav>
      {user && (
        <Form className="d-flex flex-column">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2 mb-2"
            aria-label="Search"
            value={query}
            onChange={handleSearch}
          />
          <p className="text-muted text-center">
            Title and Genre (Action, Thriller, Comedy, Animation) searches are case sensitive.
          </p>
        </Form>
      )}
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};
