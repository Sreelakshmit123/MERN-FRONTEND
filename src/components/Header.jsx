import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TastytalesImg from '../assets/images/Tasty Tales.png'
import LogoImg from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])
    return (
        <>

            {[false, 'md'].map((expand) => (
                <Navbar key={expand} expand={expand}  className="navbar fixed-top bg-white mb-3">
                    <Container fluid >
                        <Navbar.Brand href="/"><img style={{ height: '50px', width: '50px' }} src={LogoImg} alt="" /><img style={{ height: '50px', width: '70px' }} src={TastytalesImg} alt="" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <img style={{ height: '50px', width: '50px' }} src={LogoImg} alt="" /><img style={{ height: '50px', width: '70px' }} src={TastytalesImg} alt="" />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body >
                                <Nav className="header justify-content-center  flex-grow-1 pe-1">
                                    <Nav.Link >
                                        <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}><b>HOME</b> </Link>
                                    </Nav.Link>
                                    <Nav.Link >
                                        <Link to={'/about'} style={{ textDecoration: 'none', color:'black'}}><b>ABOUT</b></Link>
                                    </Nav.Link>
                                    <Nav.Link >
                                        <Link to={'/recipes'} style={{ textDecoration: 'none', color: 'black'}}><b>RECIPES</b></Link>
                                    </Nav.Link>
                                    <Nav.Link >
                                       {loginStatus? <Link to={'/newrecipes'} style={{ textDecoration: 'none', color: 'black'}}><b>ADD YOUR RECIPES</b></Link>:<Link to={'/login'} style={{ textDecoration: 'none', color: 'black'}}><b>ADD YOUR RECIPES</b></Link>}
                                    </Nav.Link>


                                </Nav>
                                <Form className="d-flex">
                                    <Nav style={{ marginRight: '50px' }}  >
                                       
                                        <Nav.Link className='fs-5 ' >
                                            <Link to={'/login'} style={{ color: 'purple' }} ><i class="fa-solid fa-user"></i> </Link>

                                        </Nav.Link>
                                        <p className='mt-2'>sign in | sign up</p>
                                    </Nav>

                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Header