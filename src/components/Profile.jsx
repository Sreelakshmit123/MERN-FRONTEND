import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import profile from '../assets/images/profile.png'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import profileimg from '../assets/images/profileimgs.png'
import { Form} from 'react-bootstrap';
import { SERVER_URL } from '../Services/serverURL';
import { updateUserProfileAPI } from '../Services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [username, setUsername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
    }
  }, [])

  
  const [userData,setuserData]=useState({
    username:"",email:"",password:"",userType:"user",bio:"",gender:"",profile:"",facebook:"",instagram:""
  })
console.log(userData);
  
  const [existingImg,setExistingImg]=useState("")
  const [preview,setPreview]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("userData")){
        const user = JSON.parse(sessionStorage.getItem("userData"))
        setuserData({...userData,username:user.username,email:user.email,password:user.password,bio:user.bio,gender:user.gender,facebook:user.facebook,instagram:user.instagram})
        setExistingImg(user.profile)
    }

},[])

useEffect(()=>{
    
    if(userData.profile){
      setPreview(URL.createObjectURL(userData.profile))
    }else{
      setPreview("")
    }
    },[userData.profile])
  
  
    const handleProfileUpdate= async ()=>{
      console.log("inside profile");
      const {username,email,password,bio,gender,profile,facebook,instagram}=userData
      if(!instagram|| !profile){
          alert("Please upload your profile pic and instagram Link")
      }else{
          const reqBody=new FormData()
          reqBody.append("username",username)
          reqBody.append("email",email)
          reqBody.append("password",password)
          reqBody.append("bio",bio)
          reqBody.append("gender",gender)
          preview?reqBody.append("profile",profile):reqBody.append("profile",existingImg)
          reqBody.append("facebook",facebook)
          reqBody.append("instagram",instagram)
          const token=sessionStorage.getItem("token")
          if(token){
            const reqHeader={
              "Content-Type":preview?"multipart/form-data":"application/json",
              "Authorization":`Bearer ${token}`
            }
            try {
              const result=await updateUserProfileAPI(reqBody,reqHeader)
              if(result.status==200){
                  sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                  toast.success("Profile updated sucessfully")
              }else{
                  console.log(result);
              }
              
            } catch (error) {
              console.log(error);
            }
          }
      }  
    }
    return (
        <>
        
      <Header/>
            <Container id='profile'>
                <Row >
                    <Col sm={4}>
                        <div style={{ marginTop: "100px" }}>
                            <ButtonGroup className='border ' vertical>
                                <div className='col-lg-12 pb-2'>
                                    <img style={{ height: '50px', width: '50px' }} className=' bg-dark ' src={profile} alt="" /> <span style={{ fontFamily: '"Satisfy", cursive' ,fontSize:'30px' }} className='ps-4  text-dark ms-1 pt-2 pb-2 ps-5 pe-4 rounded'><b>hi, {username?.split(" ")[0]}</b></span>
                                </div>

                                <Button style={{ paddingLeft: '150px', paddingRight: '150px' }}className='btn btn-dark '><Link to={'/profile'} style={{ textDecoration: 'none', color: "white" }}>My Profile </Link></Button>
                                <Button className='btn btn-dark '> <Link to={'/personalrecipes'} style={{ textDecoration: 'none', color: "white" }}>All Personal Recpies </Link></Button>
                                <Button className='btn btn-dark '>  <Link to={'/favorite'} style={{ textDecoration: 'none', color: "white" }}> Saved Recpies </Link>
                                </Button>
                            </ButtonGroup>
                           
                            <img className='imagerecpie mt-5' src="https://i.gifer.com/3mFj.gif" alt="" />
                                                    
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div style={{ marginTop: "100px" }} >
                           
                                <div >
                                    <h4><b>PROFILE INFO</b><span  style={{ float: 'right' }}>  <Button  onClick={handleProfileUpdate} variant="dark" >SAVE CHANGES</Button>
                                    </span></h4>
                                </div>
<br />
                        <p>These details will be used for all the Meredith profiles associated with your email address. By filling out this information, you will receive a more personalized experience across all Meredith websites.</p>
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header ><b>ABOUT ME</b></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row  mt-5">
                                            <div className="col-lg-6">
                                                <Form.Label>Full Name*
                                                    <Form.Control style={{ width: '340px' }} aria-label="fullname" type="text" name="firstname" id="" required placeholder={username?.split(" ")[0]}  value={userData.username} onChange={e=>setuserData({...userData,username:e.target.value})}/>
                                                </Form.Label>
                                                <br />
                                                <Form.Label>Bio 
                                                    <Form.Control style={{ width: '340px',height:'150px' }} as="textarea" aria-label="dateofbirth" type="text" name="firstname" id="" required placeholder=''  value={userData.bio} onChange={e=>setuserData({...userData,bio:e.target.value})} />
                                                </Form.Label>
                                                <br />
                                     
                                                <Form.Label>Gender
                                                    <Form.Select name='gender' style={{ width: '340px' }} aria-label="Default select example"  value={userData.gender} onChange={e=>setuserData({...userData,gender:e.target.value})} >
                                                        <option >Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="others">Others</option>
                                                    </Form.Select> </Form.Label>

                                            </div>
                                            <div className="col-lg-1" />
                                            <div className="col-lg-5 justify-content-center ">
                                                <h5 className='text-dark'><b>Add an Image</b></h5>
                                                <label className='shadow' >
                                                    <input style={{ display: 'none' }} type="file"  onChange={e=>setuserData({...userData,profile:e.target.files[0]})}/>
                                                    {existingImg==""?
                                                    <img className='rounded-circle bg-light  m-2 ' width={'250px'} height={'250px'} src={preview?preview:profileimg} alt="uploaded image" />
                                                    :
                                                    <img className='rounded-circle bg-light  m-2 ' width={'250px'} height={'250px'} src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="uploaded image" />
                                                    }
                                                    <h5 className='text-center text-dark'><b>Profile Photo</b></h5>
                                                </label>
                                            </div>

                                        </div>



                                    </Accordion.Body>
                                </Accordion.Item>
                                <br />
                                <Accordion.Item eventKey="1" alwaysOpen>
                                    <Accordion.Header><b>SOCIAL MEDIA ACCOUNTS</b></Accordion.Header>
                                    <Accordion.Body>

                                        <Form.Label>Facebook
                                            <Form.Control style={{ width: '340px' }} type="text" name="firstname" id="" required placeholder='Enter your facebook URL' value={userData.facebook} onChange={e=>setuserData({...userData,facebook:e.target.value})} />
                                        </Form.Label>
                                        <br />
                                        <Form.Label>Instagram
                                            <Form.Control style={{ width: '340px' }} type="text" name="firstname" id="" required placeholder='Enter your instagram URL' value={userData.instagram}  onChange={e=>setuserData({...userData,instagram:e.target.value})} />
                                        </Form.Label>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                        </div>
                    </Col>
                    <ToastContainer autoClose={3000} theme='colored' />
                </Row>
            </Container>
            <Footer/>
            <div class="up-arrow icon">
                <a href="#profile"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
        </>
    )
}

export default Profile