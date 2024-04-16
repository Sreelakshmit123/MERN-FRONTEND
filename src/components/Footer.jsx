import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoImg from '../assets/images/logo.png'

function Footer() {
  return (
    <div  className='bg-white '>


      <div className='container w-100 h-100  mb-5 mt-5'>

        <div className="footer-content  d-flex justify-content-between">
          <Row>

            <Col sm >
            <p style={{ height: '20px', color: 'black' }}><b>Taste Tales</b></p>
              <div style={{ color: 'black' }} className="title ">
                <span style={{ height: '50px' }} >Dolor sit amet consectetur adipisicing elit. Porro hic atque consectetur perspiciatis suscipit ex vitae iste quis consequatur in quaerat, quo fugit beatae numquam voluptatum distinctio error illo amet. sit amet consectetur adipisicing elit. Expedita accusantium ducimus asperiores fugiat vero sed, sint assumenda ea. Eaque sint quos ad error  </span><br />
              

              </div>
            </Col> 
            
            <Col sm>
              <div className="guides d-flex flex-column  ">
                <p style={{ height: '20px', color: 'black' }}><b>Links</b></p>
                <Link to={'/'} style={{ color: 'black' }} className='text-decoration-none'> Home</Link>
                <Link to={'/about'} style={{ color: 'black' }} className='text-decoration-none'> About</Link>
                <Link to={'/recipes'} style={{ color: 'black' }} className='text-decoration-none'>Recipes </Link>
                <Link to={'/yourrecipes'} style={{ color: 'black' }} className='text-decoration-none'> Add Your Recipes</Link>
                <Link to={'/about'} style={{ color: 'black' }} className='text-decoration-none'> Contact Us</Link>

              </div>
             
            </Col>
            
            <Col sm >
               <div  >
                    <p style={{ height: '45px', fontFamily: '"Satisfy", cursive',fontSize:'55px' }} >Sign Up <span style={{fontFamily:' "Platypi", serif',fontSize:'22px'}} >FOR EMAIL UPDATES</span></p>
                  <div  className="contact  container  bg-light p-5 ">
                    <div className='d-flex'>
                      <input placeholder='Enter Your Mail' type="text" className="form-control" />
                      <button  className='btn btn-dark  ms-2'><i class="fa-solid fa-arrow-right "></i></button>
                    </div>
                    
                  </div>
    
               </div>
            </Col>
            <div  className="icons mt-5 d-flex justify-content-left text-dark ms-3">
                  <i style={{ height: '55px' }} class="fa-solid fa-envelope  pe-4 fa-2x"></i>
                  <i style={{ height: '55px' }} class="fa-brands fa-twitter  pe-4 fa-2x"></i>
                  <i style={{ height: '55px' }} class="fa-brands fa-facebook pe-4 fa-2x"></i>
                  <i style={{ height: '55px' }} class="fa-brands fa-instagram pe-4 fa-2x"></i>
                  <i style={{ height: '55px' }} class="fa-brands fa-linkedin pe-4  fa-2x"></i>

                </div>
                
                <h1 className='text-dark ' style={{ height: '50px', fontFamily: '"Satisfy", cursive' }} > <img   style={{ height: '60px', width: '60px' }} src={LogoImg} alt="" /> <b>Taste Tales   </b><span style={{fontFamily:' "Platypi", serif',fontSize:'13px'}} className=' text-black'> &copy; 2024 Taste Tales All Rights Reserved.</span></h1>
          </Row>
          

        </div>
        <p style={{ color: 'gray' }} className='text-center mt-5 '><Link style={{textDecoration:'none',color:'gray'}}>Privacy Policy</Link><Link style={{textDecoration:'none',color:'gray'}} > *  Terms</Link></p>
      </div>

    </div>
  )
}

export default Footer