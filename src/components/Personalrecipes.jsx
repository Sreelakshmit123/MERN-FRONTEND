import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import profile from '../assets/images/profile.png'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import PerosalRecpiesImg from '../assets/images/personalRecpies.png'
import { getUserRecipeAPI } from '../Services/allAPIs';
import RecipeCard from './RecipeCard';
import ReactPaginate from 'react-paginate';

function Personalrecipes() {
  const [username, setUsername] = useState("")
  const [personalRecipe,setpersonalRecipe]=useState([])

  

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
      
    }
  }, [])

   
  const getpersonalRecipe =async ()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result= await getUserRecipeAPI(reqHeader)
      if(result.status==200){
        setpersonalRecipe(result.data)
      }else{
        console.log(result);
      }
      
    }
  }

  console.log(personalRecipe);
  useEffect(()=>{
    getpersonalRecipe()
  },[])
  // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
 const recipesPerPage = 4;
 const handlePageChange = ({ selected }) => {
     setCurrentPage(selected + 1);
 };
 const indexOfLastRecipe = currentPage * recipesPerPage;
 const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
 const Recipes = personalRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);
  return (
   <>
     <Header/>
      <Container id='personalrecipe' >
        <Row  >
          <Col  sm={4} >
            <div style={{ marginTop: "100px" }}>
              <ButtonGroup className='border ' vertical>
                <div  className='col-lg-12 pb-2'>
                  <img  style={{height:'50px',width:'50px'}} className=' bg-dark '  src={profile} alt="" /> <span style={{fontFamily: '"Satisfy", cursive' ,fontSize:'30px'}} className='ps-4  text-dark ms-1 pt-2 pb-2 ps-5 pe-4 rounded'><b>hi, {username?.split(" ")[0]}</b></span>
                </div>
                
                  <Button style={{ paddingLeft: '160px', paddingRight: '160px' }} className='btn btn-dark '><Link to={'/profile'} style={{ textDecoration: 'none', color: "white" }}>My Profile </Link></Button>
                  <Button className='btn btn-dark '> <Link to={'/personalrecipes'} style={{ textDecoration: 'none', color: "white" }}>All Personal Recpies </Link></Button>
                  <Button className='btn btn-dark '>  <Link to={'/favorite'} style={{ textDecoration: 'none', color: "white" }}> Saved Recpies </Link>
                  </Button>
                </ButtonGroup>
                <img className='imagerecpie1 mt-5' src="https://i.gifer.com/3mFj.gif" alt="" />
            </div>
          </Col>
          <Col sm={8} style={{ marginTop: "100px", display: 'flex', flexWrap: 'wrap' ,justifyContent: 'space-around' }} >

          {Recipes?.length>0?Recipes.map((recipes,_id)=>(
             <div className='mb-5' key={recipes._id}> <RecipeCard recipes={recipes} personalRecipes/></div>
            )): 
            <Col>  
          <div style={{ marginTop: "110px" }} className='text-center mb-5  '>
            <img width={'55%'} height={'350px'} src={PerosalRecpiesImg} alt="" />
            <h3 className='mt-3'><b>You haven't created any recipes yet.</b></h3>
            <h5  className='mt-3'>To add a recipe click the button below</h5>
          <Link to={'/newrecipes'}>  <Button className='btn btn-dark'>Add Recipes</Button></Link>
         </div>
         </Col>
}  

</Col>
<div className='d-flex justify-content-center '>  <ReactPaginate pageCount={Math.ceil(personalRecipe.length / recipesPerPage)} pageRangeDisplayed={4} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" previousLabel={<span style={{ color: 'blue' }}><i className="fa-solid fa-arrow-left border rounded-circle bg-dark text-light p-2 me-2"></i></span>} nextLabel={<span style={{ color: 'green' }}><i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 ms-2"></i></span>} breakLabel={<span style={{ color: 'red' }}>...</span>} breakClassName="break-me" /></div>

        </Row>
      </Container>
      <Footer/>
      <div class="up-arrow icon">
                <a href="#personalrecipe"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
   </>
  )
}

export default Personalrecipes









