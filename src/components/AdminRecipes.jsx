import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { deleteRecipeAPI, getUserRecipeAPI } from '../Services/allAPIs';
import { addReciperesponseContext, deleteRecipeResponseContext } from '../Context API/ContextShare'
import { SERVER_URL } from '../Services/serverURL';
import ReactPaginate from 'react-paginate';
import EditRecipe from './EditRecipe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { tokenAuthenticationContext } from '../Context API/TokenAuthen';
    
function AdminRecipes() {
    const { addReciperesponse, setAddRecipeResponse } = useContext(addReciperesponseContext)
    const { deleteRecipeResponse, setDeleteRecipeResponse } = useContext(deleteRecipeResponseContext)
    const { isAuthorised, setIsAuthorised } = useContext(tokenAuthenticationContext)
    const [searchKey, setSearchKey] = useState("")

  const [personalRecipe,setpersonalRecipe]=useState([])

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

    useEffect(() => {
        getpersonalRecipe()
    }, [searchKey, addReciperesponse, deleteRecipeResponse])
 
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

    const handleDeleteRecipe = async (rid) => {
        const token = sessionStorage.getItem("token")

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            try {
                const result = await deleteRecipeAPI(rid, reqHeader)
                if (result.status == 200) {
                    toast.success("deleted sucessfull");
                    setDeleteRecipeResponse(true)
                } else {
                    toast.warning(result.response.data)
                }

            } catch (err) {
                console.log(err);
            }
        }
    }
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const Recipes = personalRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);
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
        <div className="col-lg-9" style={{ marginTop: '40px' }}>
                    <div className='d-flex justify-content-between '>
                        <h3>All Recipes</h3>
                        <Form className="d-flex pe-5">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={e => setSearchKey(e.target.value)}
                            />
                            <Button className='fs-5 text-dark ' variant="outline-none"><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </Form>
                    </div>
                    <div class="mt-5">
                        <table class="table ms-2">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Img</th>
                                    <th>Recipes Name</th>
                                    <th> Edit</th>
                                    <th><i class="fa-solid fa-trash"></i> Delete</th>
                                </tr>
                            </thead>
                            {Recipes?.length>0?Recipes.map((recipes,index)=>(<tbody key={recipes._id} >
                                <tr>
                                    <td>{index + 1}</td>
                                    <td><img style={{ height: '50px', width: '50px' }} variant="top" src={`${SERVER_URL}/uploads/${recipes.recipeImage}`} alt="" /></td>
                                    <td>{recipes.title}</td>

                                    <td ><EditRecipe recipes={recipes} /></td>
                                    <td><Button onClick={() => handleDeleteRecipe(recipes?._id)} className='btn btn-danger '>Delete</Button></td>
                                </tr>
                            </tbody>)) :
                                null}
                        </table>
                        <div className='d-flex justify-content-center '>  <ReactPaginate pageCount={Math.ceil(personalRecipe.length / recipesPerPage)} pageRangeDisplayed={6} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" previousLabel={<span style={{ color: 'blue' }}><i className="fa-solid fa-arrow-left border rounded-circle bg-dark text-light p-2 me-2"></i></span>} nextLabel={<span style={{ color: 'green' }}><i className="fa-solid fa-arrow-right border rounded-circle bg-dark text-light p-2 ms-2"></i></span>} breakLabel={<span style={{ color: 'red' }}>...</span>} breakClassName="break-me" /></div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} theme='colored' />

            </div>

    </>
  )
}

export default AdminRecipes