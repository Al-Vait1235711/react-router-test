import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { projurl } from '../App';


export default function HeaderComp(){

    return(
        <Navbar  expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href={projurl}>SomeCompany</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
          <Nav.Link href={projurl}>Home</Nav.Link>
          <Nav.Link href={projurl + "about"}>About</Nav.Link>
          <Nav.Link href={projurl + "contact"}>Contact</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}




