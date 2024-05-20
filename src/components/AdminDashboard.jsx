import React, { useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Chart from './Chart';

function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  const [value, setValue] = useState(new Date()); // Initialize with the current system date
  const [show, setShow] = useState(false);
  const onChange = (date) => {
    setValue(date instanceof Date ? date : date[0]);
  };
  return (
    
    <>
      <Navbar style={{width:'100%',height:"9vh",backgroundSize:'cover', backgroundImage:`url('https://images.pexels.com/photos/4198715/pexels-photo-4198715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`}} data-bs-theme="dark" className='fixed-top'>
        <Container>
          <Navbar.Brand style={{fontFamily: '"Satisfy", cursive',fontSize:'25px' }} className='fw-bolder ' >Tasty Tales</Navbar.Brand>
          <Nav className="ms-auto">
            <Button  onClick={handleLogout} className='btn btn-dark'>Logout <i className="fa-solid fa-right-from-bracket ms-2"></i></Button>
            
          </Nav>
        </Container>
      </Navbar>
     <div  className='row w-100 'style={{marginTop:'40px'}}>
        <div style={{width:'330px',height:"94vh",backgroundSize:'cover', backgroundImage:`url('https://images.pexels.com/photos/4198715/pexels-photo-4198715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`}} className='col-lg-3 text-light'>
        <div className='bg-transparent'>
          <h4 className='pt-5 pb-5 text-center'><b>Welcome Admin</b></h4>
          <Container className='fw-bolder ms-2'>
           <div className='mb-5'>
               <Link to='/admin' style={{textDecoration:'none',color:'white'}}  ><b><i class="fa-solid fa-house-chimney"></i> Dashboard</b></Link>
               <br />
           </div>
           <div className='mb-5'>
               <Link to='/allrecipesadmin' style={{textDecoration:'none',color:'white'}}  ><b><i class="fa-brands fa-slack"></i> All Recipes</b></Link>
               <br />
           </div>
           <div className='mb-5'>
               <Link to='/addrecipesadmin' style={{textDecoration:'none',color:'white'}}  ><b><i class="fa-solid fa-user-plus"></i> Add Recipes</b></Link>
               <br />
           </div>
           <div className='mb-5'>
               <Link to='/adminrecipes' style={{textDecoration:'none',color:'white'}}  ><b><i class="fa-solid fa-bowl-food"></i> Admin Recipes</b></Link>
               <br />
           </div>
          
          </Container>
        </div>
  
        </div>
        <div className='col-lg-9'>
           <div style={{backgroundImage:`url('https://t4.ftcdn.net/jpg/03/08/57/07/360_F_308570796_hLIklS57KURDhUpmIi1ntbrpy2qkS5U0.jpg')`}} className='fw-bolder mt-5 text-light fs-2 p-5'>Dashboard</div>
          <div className="row mt-3">
            <div className="col-lg-7">
              <h3>Charts</h3>
              <div style={{ height: '400px',width:'500px'  }} className='me-5  rounded bg-light'>
              <Chart />
              
            </div>
            </div>
            <div className="col-lg-5 mt-5">
              <h3>Calender</h3>
            <div className='rounded'>
              <Calendar  onChange={onChange} value={value} />
            </div>
            </div>

          </div>
        </div>
     </div>
    </>
  )
}

export default AdminDashboard