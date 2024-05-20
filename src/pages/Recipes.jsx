import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'

import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TastytalesImg from '../assets/images/Tasty Tales.png'
import LogoImg from '../assets/images/logo.png'
import { getAllRecipesAPI } from '../Services/allAPIs';
import RecipeCard from '../components/RecipeCard';
import { addReciperesponseContext, deleteRecipeResponseContext } from '../Context API/ContextShare'
import ReactPaginate from 'react-paginate';

function Recipes() {

  const { addReciperesponse, setAddRecipeResponse } = useContext(addReciperesponseContext)
  const { deleteRecipeResponse, setDeleteRecipeResponse } = useContext(deleteRecipeResponseContext)
  const [loginStatus, setLoginStatus] = useState(false)
  const [allrecipes, setAllRecipes] = useState([])
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  useEffect(() => {
    getAllRecipes()
  }, [searchKey, addReciperesponse, deleteRecipeResponse])

  const getAllRecipes = async () => {
    const result = await getAllRecipesAPI(searchKey)
    console.log("Result of Api call of all recipes:", result);
    if (result.status == 200) {
      setAllRecipes(result.data)
    } else {
      console.log(result);
    }
  }
 // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
 const recipesPerPage = 8;
 const handlePageChange = ({ selected }) => {
     setCurrentPage(selected + 1);
 };
 const indexOfLastRecipe = currentPage * recipesPerPage;
 const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
 const Recipes = allrecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  return (
    <>
      {/* header */}

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
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>   <b>HOME</b> </Link>
                  </Nav.Link>
                  <Nav.Link >
                    <Link to={'/about'} style={{ textDecoration: 'none', color: 'black' }}>   <b>ABOUT</b></Link>
                  </Nav.Link>
                  <Nav.Link >
                    <Link to={'/recipes'} style={{ textDecoration: 'none', color: 'black' }}>  <b>RECIPES</b></Link>
                  </Nav.Link>
                  <Nav.Link >
                    {loginStatus ? <Link to={'/newrecipes'} style={{ textDecoration: 'none', color: 'black' }}><b>ADD YOUR RECIPES</b></Link> : <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}><b>ADD YOUR RECIPES</b></Link>}
                  </Nav.Link>


                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={e => setSearchKey(e.target.value)}
                  />
                  <Button className='fs-5 text-dark ' variant="outline-none"><i class="fa-solid fa-magnifying-glass"></i></Button>
                </Form>
                {loginStatus && <Nav.Link className='btn rounded'>
                  <Link to={'/favorite'} className='d-flex align-items-center fs-5' style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                    <i style={{ marginTop: '13px' }} className="fa-solid fa-bookmark text-dark ms-2 me-3"></i>
                  </Link>
                </Nav.Link>}
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
      {/* navbarv end */}


      <div style={{ marginTop: '80px' }}id='recipes'>
        <h1 style={{ fontFamily: '"Satisfy", cursive' }}  className='text-center text-dark mb-3'><b>All Recpies</b></h1>
        {/* card */}

       <div className='d-flex justify-content-evenly fw-bolder'>
       <Link to={'/category-soups'} ><p>Soups</p></Link>
         <Link to={'/category-lunch'}> <p>Lunch</p></Link>
         <Link to={'/category-dessert'}><p>Dessert</p></Link>
         <Link to={'/category-snacks'}><p>Snacks</p></Link> 
         <Link to={'/category-drinks'}> <p>Drinks</p></Link>
       </div>
        <Row className='container mt-5'>
          {Recipes?.length > 0 ? Recipes.map((recipes, index) => (
            <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
              <RecipeCard recipes={recipes} />
            </Col>
          )) :
            null
          }
        </Row>
        <div className='d-flex justify-content-center '>  <ReactPaginate pageCount={Math.ceil(allrecipes.length / recipesPerPage)} pageRangeDisplayed={8} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" previousLabel={<span style={{ color: 'blue' }}><i className="fa-solid fa-arrow-left border rounded-circle bg-dark text-light p-2 me-2"></i></span>} nextLabel={<span style={{ color: 'green' }}><i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 ms-2"></i></span>} breakLabel={<span style={{ color: 'red' }}>...</span>} breakClassName="break-me" /></div>


      </div>
      <Footer />
      <div class="up-arrow icon">
                <a href="#recipes"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default Recipes