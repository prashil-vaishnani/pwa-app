import React from "react";
//import Counter from './component/counter';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";

function App() {
  return (
    <div>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>PWA</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="users/*" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
