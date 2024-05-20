import React, { useContext, useState } from 'react'
import { Form, Spinner} from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { loginAPI, registerAPI } from '../Services/allAPIs';
import { tokenAuthenticationContext } from '../Context API/TokenAuthen';

function Auth({ insideRegister }) {

  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthenticationContext)
  const navigate = useNavigate()
  const [userType, setUserType] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  })
  console.log(userData);
  const [loginStatus,setLoginStatus]=useState(false)
  //Register
  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.warning("Please fill the form completely!!!")
    }
    else {
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if (result.status === 200) {
          toast.success(`${result.data.username} has registered successfully!!!`)
          setUserData({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/login')
          }, 3000);

        } else {
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // login

  const handleLogin = async (e) => {

    e.preventDefault()
    const { email, password } = userData

    if (!email || !password ) {
      toast.info("Please fill the Form Completely!!")
    } else {
      try {
        const result = await loginAPI({ email, password }, userType)
        console.log("login result:", result);
        console.log(("inside login userType:", userType));
        if (result.status === 200) {
            sessionStorage.setItem("username", result.data.existingUser.username)
            sessionStorage.setItem("token", result.data.token)
            sessionStorage.setItem("userType", "user");
            sessionStorage.setItem("userData", JSON.stringify(result.data.existingUser))
            setIsAuthorised(true)
            setUserData({ email: "", password: "" })
            setUserType({userType:''})
            console.log("Login successful!");
            setLoginStatus(true);
            setTimeout(() => {
              if(result.data.existingUser.email=="admin@gmail.com" && secretKey=="AdminSree"){
                navigate('/admin')
                setAdminEmail(JSON.parse(sessionStorage.getItem('userData'))?.email)
              }else if (email=='user' && secretKey!="AdminSree"){
               toast.warning("Invalid admin")
              }else{
                navigate('/newrecipes')
                console.log("Login successful!");
                setLoginStatus(false)
              }  
            }, 2000)
            setLoginStatus(false)
          
        } else {
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

  }

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  };


  return (
    <>

      <Header />
      <div id='auth' className='authimg  pb-5 '>
        <img style={{ width: '100%', height: '100vh' }} src="https://64.media.tumblr.com/eccbfe81d423b3ed00567eedf513b7f6/tumblr_inline_oypss03D0J1rxppp7_540.gifv" alt="" />


        <div className="auth bg-transparent  card mb-5">

          <div className=' auth row bg-black border rounded-5 align-items-center'>


            <div className='col pt-5  text-center'>
              <h1 style={{ color: 'white', fontFamily: '"Satisfy", cursive', fontSize: '50px' }} > Tasty Tales</h1>
              <h2 style={{ color: 'white' }} className="fw-bolder mt-2">{insideRegister ? "sign up" : "Sign in "}</h2>

              <Form className="w-100">
                <div>
                  <label style={{ color: 'white' }} >
                    <input
                      type="radio" className='me-2'
                      name='userType'
                      value="user"
                      checked={userType === 'user'}
                      onChange={handleRadioChange}
                    />
                    User
                  </label>
                  <label style={{ color: 'white' }} className='ms-5 mb-2'  >
                    <input
                      type="radio" className='me-2'
                      name='userType'
                      value="admin"
                      checked={userType === 'admin'}
                      onChange={handleRadioChange}
                    />
                    Admin
                  </label>

                  
                </div>
              {userType==="admin" ?<Form.Group className="mb-3 me-4 ms-4" controlId="formBasicName">
                    <Form.Control type="password" placeholder="Secret Key" onChange={e=> setSecretKey(e.target.value)} />
                  </Form.Group>:null}

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
                      <button onClick={handleRegister} className='btn btn-dark mb-2 ps-5 pe-5 '>Sign Up</button>
                      <p className='text-white text-center'>or</p>


                      <p className='mt-3 text-white  text-center'>Already have an Account? click here to <Link to={'/login'} className='text-primary'>Login</Link></p>
                    </div> :
                    <div>
                      <button onClick={handleLogin}   disabled={loginStatus} className='btn btn-dark mb-2  ps-5 pe-5'>Login{loginStatus ? <Spinner animation="border" variant="light" />:""}</button>
                      <p className='text-center text-white'>or</p>

                      <div className='d-flex justify-content-center'>

                      </div>

                      <p className='mt-4 text-center text-white'>Don't have an account? click here to <Link to={'/register'} className='text-primary'>Sign Up</Link></p>
                    </div>
                }
              </Form>


            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} theme='colored' />
      </div>
      <Footer />
      <div class="up-arrow icon">
                <a href="#auth"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default Auth