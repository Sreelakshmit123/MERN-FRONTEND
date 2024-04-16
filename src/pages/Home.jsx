import React from 'react'
import landingimage from '../assets/images/landingimg.png'
import { Button, Form, Card, } from 'react-bootstrap'


function Home() {
  return (

    <>
      {/* landing page */}

      <div style={{ width: '100%', height: '100vh', color: 'white', backgroundImage: `url('https://wallpapers.com/images/hd/plain-black-with-wooden-pattern-09v7n22juf06luep.jpg')` }}  >
        <div style={{ height: '75%' }} className='container'>
          <div style={{ height: '100%' }} className="row align-items-center ">
            <div style={{ marginTop: '95px' }} className="col-lg-5 text-white " >
              <h1><b>Tasty Tales </b></h1>
              <p style={{ fontFamily: '"Satisfy", cursive', fontSize: '20px' }}>Spoonful of stories...</p>
              <p>We’ve organized these recipes every way we could think of so you don't have to! Dietary restrictions, weeknight dinners, meal prep recipes, some of our most tried-and-true… no matter how you browse, we’re sure you’ll find just what you were looking for.</p>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button style={{ color: 'white' }} className='fs-5 ' variant="outline-none"><i class="fa-solid fa-magnifying-glass"></i></Button>
              </Form>

            </div>
            <div className="col-lg-2" />

            <div  className="col-lg-5" >
              <img className='landingimg' style={{ transform: 'rotate(180deg)' }} src={landingimage} alt="" />
            </div>
          </div>

        </div>
      </div>
      {/* categories */}
      <div className='categories  mt-5'>
     
          <Card className='ms-4' style={{ width: '12rem' }}>
          <Card.Img variant="top" src="https://pinchofyum.com/wp-content/uploads/Sesame-Butter-Noodles-183x183.jpg" />
         
        </Card>
        <Card className='ms-4' style={{ width: '12rem' }}>
          <Card.Img variant="top" src="https://pinchofyum.com/wp-content/uploads/Sesame-Butter-Noodles-183x183.jpg" />
         
        </Card>
        <Card className='ms-4' style={{ width: '12rem' }}>
          <Card.Img variant="top" src="https://pinchofyum.com/wp-content/uploads/Sesame-Butter-Noodles-183x183.jpg" />
         
        </Card>
        <Card className='ms-4' style={{ width: '12rem' }}>
          <Card.Img variant="top" src="https://pinchofyum.com/wp-content/uploads/Sesame-Butter-Noodles-183x183.jpg" />
         
        </Card>
        <Card className='ms-4' style={{ width: '12rem' }}>
          <Card.Img variant="top" src="https://pinchofyum.com/wp-content/uploads/Sesame-Butter-Noodles-183x183.jpg" />
         
        </Card>
       
       
      
      </div>
    </>
  )
}

export default Home