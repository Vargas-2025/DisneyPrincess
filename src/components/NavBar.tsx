// Component 1 — Navigation bar rendered on every page.
// Uses React Router's NavLink so the active page link is highlighted automatically.

import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        {/* Brand logo — clicking it goes back to the home page */}
        <Link to="/" className="navbar-brand">
          👑 Princess Collection
        </Link>

        {/* Hamburger toggle for mobile screens */}
        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            {/* NavLink applies an "active" class automatically when the route matches */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-white' : 'text-white-50'}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-white' : 'text-white-50'}`}
            >
              Collection
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-white' : 'text-white-50'}`}
            >
              Add Princess
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
