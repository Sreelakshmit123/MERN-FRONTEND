import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import profile from '../assets/images/profile.png'
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { deleteSaveRecipeAPI, getSaveRecipeAPI } from '../Services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Services/serverURL';
import ReactPaginate from 'react-paginate';

function favoriteRecipes({recipes}) {
  const navigate=useNavigate()

  const handleImg = () => {
    console.log(recipes);
    const { _id } = recipes
    navigate(`/view/${_id}`)
  }


  const [saveRecipe,setSaveRecipe]=useState([])
  
  const getSaveRecipe= async ()=>{
    console.log("inside get favouites");
    const token=sessionStorage.getItem("token")

    if(token){
       const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
       }
        const result = await getSaveRecipeAPI(reqHeader)
        if(result.status==200){
            console.log("Save list:",result);
            setSaveRecipe(result.data)
        }else{
            console.log(result);
        }
    }
  }
  console.log(saveRecipe);

  const handledelete= async(rid)=>{
    const token=sessionStorage.getItem("token")

    if(token){
     const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }

     try{
      const result= await deleteSaveRecipeAPI(rid,reqHeader)
      if(result.status==200){
        toast.success("deletion sucessfull");
        getSaveRecipe()
      }else{
        toast.warning(result.response.data)
      }
     }catch(err){
      console.log(err);
     }
    }
  }


  useEffect(()=>{
    getSaveRecipe()
  },[])


  const [username, setUsername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
    }
  }, [])
// Pagination states
const [currentPage, setCurrentPage] = useState(1);
const recipesPerPage = 4;
const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
};
const indexOfLastRecipe = currentPage * recipesPerPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
const Recipes = saveRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);
  return (
    <>
<Header/>
<Container >
        <Row id='fav' >
          <Col lg={4}>
            <div style={{ marginTop: "100px" }}>
              <ButtonGroup className='border ' vertical>
                <div  className='col-lg-12 pb-2'>
                  <img  style={{height:'50px',width:'50px'}} className=' bg-dark ' src={profile} alt="" /> <span style={{fontFamily: '"Satisfy", cursive'  ,fontSize:'30px'}} className='ps-4 text-dark ms-1 pt-2 pb-2 ps-5 pe-4 rounded'><b>hi, {username?.split(" ")[0]}</b></span>
                </div>
                
                  <Button style={{ paddingLeft: '150px', paddingRight: '150px' }} className='btn btn-dark '><Link to={'/profile'} style={{ textDecoration: 'none', color: "white" }}>My Profile </Link></Button>
                  <Button className='btn btn-dark '> <Link to={'/personalrecipes'} style={{ textDecoration: 'none', color: "white" }}>All Personal Recpies </Link></Button>
                  <Button className='btn btn-dark '>  <Link to={'/saveorite'} style={{ textDecoration: 'none', color: "white" }}> Saved Recpies </Link>
                  </Button>
                </ButtonGroup>
                <img className='imagerecpie1 mt-5' src="https://i.gifer.com/3mFj.gif" alt="" />
            </div>
          </Col>
          
          <Col lg={8} style={{ marginTop: "110px", display: 'flex', flexWrap: 'wrap' ,justifyContent: 'space-around' }}>  
          {Recipes?.length>0?Recipes.map((recipes,ukey)=>(
              <Card className='mb-4 ms-3'style={{ height:'22rem',width:"21rem"}} >
            <Card.Img key={ukey} style={{ height:'15rem'}} className='ps-3 mt-3 pe-3' onClick={handleImg}  variant="top" src={`${SERVER_URL}/uploads/${recipes.recipeImage}`}/>
            <Card.Body>
            <Card.Title>{recipes?.title}  <button onClick={()=>handledelete(recipes._id)} style={{float:'right'}} className='btn fs-5'><i className='fa-solid fa-trash text-danger'></i></button></Card.Title>
            </Card.Body>
            
            </Card> 
           
       )) :
          <div className='text-center  mb-5 '>
            <img width={'55%'} height={'400px'} src="https://mega-byte.co.il/wp-content/themes/MegaByte2020cart/images/empty-cart.png" alt="" />
            <h3 className='mt-3'><b>You haven't saved anything yet.</b></h3>
          <Link to={'/recipes'}>  <Button className='btn btn-dark'>Back to Recipes</Button></Link>
           </div>
         
      }  
          </Col>
          <div className='d-flex justify-content-center '>  <ReactPaginate pageCount={Math.ceil(saveRecipe.length / recipesPerPage)} pageRangeDisplayed={4} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" previousLabel={<span style={{ color: 'blue' }}><i className="fa-solid fa-arrow-left border rounded-circle bg-dark text-light p-2 me-2"></i></span>} nextLabel={<span style={{ color: 'green' }}><i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 ms-2"></i></span>} breakLabel={<span style={{ color: 'red' }}>...</span>} breakClassName="break-me" /></div>
          <ToastContainer autoClose={3000} theme='colored' />
        </Row>
      </Container>
      <Footer/>
      <div class="up-arrow icon">
                <a href="#fav"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default favoriteRecipes