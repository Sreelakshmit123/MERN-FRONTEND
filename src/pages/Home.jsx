import React, { useState } from 'react'
import homereviewimg from '../assets/images/homereviewimg.png'
import { Row, Col } from 'react-bootstrap'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getcategoryRecipesAPI } from '../Services/allAPIs'
import RecipeCard from '../components/RecipeCard'
import homeimg from '../assets/images/homeimg.png'
import { Link } from 'react-router-dom'
function Home() {
  const [allrecipes,setAllRecipes]=useState([])
  const handleCategoryClick =async (category) => {
      const res= await getcategoryRecipesAPI(category)
      console.log("category response: ",res);
      if(res.status==200){
        setAllRecipes(res.data)
      }else{
        console.log(res);
      }
    }
  
  const recipes = allrecipes.slice(0,8)
  return (

    <>
    <Header/>
      {/* landing page */}

      <div id='landingpage' >
        <div style={{ height: '75%' }} className='container fw-bolder'>
          <div style={{ height: '100%' }} className="row align-items-center ">
            <div style={{ marginTop: '120px' }} className="col-lg-7 text-white " >
              <h1><b>Tasty Tales </b></h1>
              <p style={{ fontFamily: '"Satisfy", cursive', fontSize: '20px' }}>Spoonful of stories...</p>
              <p>We’ve organized these recipes every way we could think of so you don't have to! Dietary restrictions, weeknight dinners, meal prep recipes, some of our most tried-and-true… no matter how you browse, we’re sure you’ll find just what you were looking for.</p>
             
            </div>

            <div  className="col-lg-5" >
              {/* <img className='landingimg' style={{ transform: 'rotate(180deg)' }} src={landingimage} alt="" /> */}
            </div>
          </div>

        </div>
      </div>
      {/* categories */}
      <div className="d-flex mt-5 justify-content-around align-align-items-center flex-wrap">
           
           <div>
             <button  className="btn " >
               <img className='rounded-circle' onClick={() => handleCategoryClick('Soups')}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1ODRLxtpQi-yFDoLRXYkXfSoTmqHnU7Ne5WqzhseavOV_qpwVV9MqwgPpAEs-KlBcI0&usqp=CAU" alt="" style={{height:'180px',width:'180px'}} />
             </button>
             <p className='text-center'>Soups</p>
           </div> 
           <div>
           <button  className="btn  " >
           <img className='rounded-circle'onClick={() => handleCategoryClick('Lunch')} src="https://traditionallymodernfood.com/wp-content/uploads/2021/08/south-indian-lunch-combo-scaled.jpeg" alt="" style={{height:'180px',width:'180px'}} />
           </button>
           <p className='text-center'>Lunch</p>
         </div> 
         <div>
           <button  className="btn " >
           <img className='rounded-circle'onClick={() => handleCategoryClick('Dessert')} src="https://wallpapercrafter.com/desktop/10101-pancakes-dessert-chocolate-fruit-4k.jpg" alt="" style={{height:'180px',width:'180px'}} />
           </button>
           <p className='text-center'>Dessert</p>
         </div>            
         <div>
           <button  className="btn " >
           <img className='rounded-circle'onClick={() => handleCategoryClick('Snacks')} src="https://www.matchingfoodandwine.com/siteimages/Food-pix/samosas-and-bhajis.jpg" alt="" style={{height:'180px',width:'180px'}} />
           </button>
           <p className='text-center'>Snacks</p>
         </div>
         <div>
           <button  className="btn " >
           <img className='rounded-circle'onClick={() => handleCategoryClick('Drinks')} src="https://foodfornet.com/wp-content/uploads/Two-glasses-of-mango-lassi-800x534.jpg" alt="" style={{height:'180px',width:'180px'}} />
           </button>
           <p className='text-center'>Drinks</p>
         </div>
         
       
   
       </div>

                {/* trending receipes */}

       <Row className='container mt-5'>
                  {recipes?.length>0? recipes.map((recipes,index)=>(
                    <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                        <RecipeCard recipes={recipes}/>
                    </Col>
                  )):
                 null
  
                }
              </Row>
              {recipes?.length>0?  <div>
             <Link to={'/recipes'} style={{textDecoration:'none',color:'black'}}> <h5 className='viewmore'>View More <i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 me-2"></i></h5></Link>
              </div>:null}

                {/* review demo */}
                <div className="container">
                  <Row>
                    <h3 className='text-center mb-5 mt-5 fw-bolder'>What <span className='text-dark'>People say </span>about us ?</h3>
                    <Col sm className='review  '>
                      
                        <p>                        <img style={{height:'100px',width:'250px',marginLeft:"-110px",marginTop:'-35px'}} className='' src={homeimg} alt="" /><h4 className='text-center'style={{marginTop:'-80px'}}>johan joy</h4></p>
                        <p className='text-warning text-center '><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                        <p className='text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, dolore, obcaecati quidem magnam, quasi maxime nihil amet delectus iusto harum reprehenderit culpa qui consequatur eos? Vel voluptate magni in alias?</p>
                       <p className='text-center mt-4 p-0 mb-0'> <i className="fa-solid fa-arrow-left border rounded-circle bg-dark text-light p-2 me-2"></i>  <i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 me-2"></i></p>
                 
                    </Col>
                    <Col sm >
                       <img className='homeimg' src={homereviewimg} alt="" />
                    </Col>
                  </Row>
                  <img className='homeleafimg' src={homeimg} alt="" /> 
                </div>
             
       <Footer/>
       <div class="up-arrow icon">
                <a href="#landingpage"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default Home