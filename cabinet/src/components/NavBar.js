import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import logo from "../assets/logo.jpg"

const NavBar = () => {
    return(
        <div>
            <Navbar fixed="top" expand="md">
                <Container>
                    <Navbar.Brand><img src={logo} alt="logo" height="45"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" text-left>
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link>Sign in</Nav.Link>
                            <Nav.Link>Sign out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar