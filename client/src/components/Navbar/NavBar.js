import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavBar(){
return(
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="/"><Link to='/'>Deliodor</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ml-auto" >
      <Nav.Link><Link to='/signup'>Sign Up</Link></Nav.Link>
      <Nav.Link><Link to='/signin'>Sign In</Link></Nav.Link>
  </Nav>
  </Navbar.Collapse>
  </Navbar>
)
}