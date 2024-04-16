import React, { useState ,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ insideRegister }) {
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "", password: "", email: ""
  })

  const handleLogin = (e) => {
    e.preventDefault()
    const { username, password } = userData
    if (username && password) {
      navigate('/home')
    }
    else {
      toast.warning("Please fill the form completely!!!")
    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    const { username, password, email } = userData
    if (username && password && email) {
      navigate('/')
      setUserData("")
    }
    else {
      toast.warning("Please fill the form completely!!!")
    }
  }

  useEffect(() => {
    if (loginStatus) {
      sessionStorage.setItem("user", JSON.stringify(loginStatus))
      toast.success("Login Successfull")
      setTimeout(() => {
        navigate('/home')
      }, 2000);
    }

  }, [loginStatus])
  return (
    <>
      <div  className='authimg  pb-5 '>
        <img style={{width:'100%', height:'100vh'}} src="https://previews.123rf.com/images/magone/magone1602/magone160200047/52173185-cooking-background-with-old-cutting-board-top-view.jpg" alt="" />
        
        <div  className="auth container">
          <div className="auth card bg-black border rounded-5  shadow mt-5  ">
            <div className=' auth row bg-black border rounded-5 align-items-center'>
              
             
              <div className='col-lg-12 pt-5  text-center'>
                <h1 style={{ color: 'white', fontFamily: '"Satisfy", cursive',fontSize:'50px' }} > Tasty Tales</h1>
                <h2 style={{ color: 'white' }} className="fw-bolder mt-2">{insideRegister ? "sign up" : "Sign in "}</h2>
                <Form className="w-100">
                  {insideRegister && (
                    <Form.Group className="mb-3 me-4 ms-4" controlId="formBasicName">
                      <Form.Control type="text" placeholder="Enter Username" onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} />
                    </Form.Group>)}

                  <Form.Group className="mb-3  me-4 ms-4" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
                  </Form.Group>

                  <Form.Group className="mb-3  me-4 ms-4" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                  </Form.Group>


                  {
                    insideRegister ?
                      <div>
                        <button  onClick={handleRegister} className='btn btn-dark mb-2 ps-5 pe-5 '>Sign Up</button>
                        <p className='text-white text-center'>or</p>

                        <div className='d-flex justify-content-center '>
                        <GoogleLogin
                          onSuccess={credentialResponse => {
                            const result = jwtDecode(credentialResponse.credential)
                            setLoginStatus(result)
                            console.log(result);
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />
                        </div>

                        <p className='mt-3 text-white  text-center'>Already have an Account? click here to <Link to={'/login'} className='text-primary'>Login</Link></p>
                      </div> :
                      <div>
                      <button onClick={handleLogin} className='btn btn-dark mb-2  ps-5 pe-5'>Login </button>
                        <p className='text-center text-white'>or</p>

                       <div className='d-flex justify-content-center'>
                          <GoogleLogin
                            onSuccess={credentialResponse => {
                              const result = jwtDecode(credentialResponse.credential)
                              setLoginStatus(result)
                              console.log(result);
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />
                       </div>
                       
                        <p className='mt-4 text-center text-white'>Don't have an account? click here to <Link to={'/register'} className='text-primary'>Sign Up</Link></p>
                      </div>
                  }
                </Form>


              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} theme='colored' />
      </div>
    </>
  )
}

export default Auth