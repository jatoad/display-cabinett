import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import logo from "../assets/logo.jpg"
import styles from '../styles/NavBar.module.css'
import {NavLink} from 'react-bootstrap'

const NavBar = () => {
    return(
        <div>
            <Navbar className={styles.NavBar} fixed="top" expand="md">
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="logo" height="45"/>
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" text-left>
                            <NavLink class="nav-link" to="/">
                                Home
                            </NavLink>
                            <NavLink class="nav-link" to="sign-in">
                                Sign In
                            </NavLink>
                            <NavLink class="nav-link" to="sign-up">
                                Sign Up
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar