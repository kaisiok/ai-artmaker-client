import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <div className="fixed top-0 w-full z-10">
      <Navbar expand="lg" className="bg-gray-lv1">
        <Container>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to={"/tagselect"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  MyPhotos
                </Link>
              </Nav.Link>
              <Nav.Link>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
