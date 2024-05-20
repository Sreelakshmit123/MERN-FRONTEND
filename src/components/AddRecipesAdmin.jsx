import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import plus from '../assets/images/plus.png'
import uploadImg from '../assets/images/uploadImg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addRecipeAPI } from '../Services/allAPIs';
import { addReciperesponseContext } from '../Context API/ContextShare';

function AddRecipesAdmin() {
  const { addReciperesponse, setAddRecipeResponse } = useContext(addReciperesponseContext)
  const [fileStatus, setFileStatus] = useState(false)
  const [preview, setpreview] = useState("")
  const [recipeData, setRecipeData] = useState({
    title: "",
    discription: "",
    ingredients: [],
    recipeImage: "",
    instructions: "",
    cookingTime: "",
    category: ""
  });

  console.log(recipeData);

  const [ingredientInput, setIngredientInput] = useState('');//for ingredients

  const handleClose = () => {
    setRecipeData({
      title: "",
      discription: "",
      ingredients: [],
      recipeImage: "",
      instructions: "",
      cookingTime: "",
      category: ""
    })
    setpreview("")
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  useEffect(() => {
    // console.log(recipeData.recipeImage.type);
    if (recipeData.recipeImage.type == "image/png" || recipeData.recipeImage.type == "image/jpg" || recipeData.recipeImage.type == "image/jpeg") {
      console.log("generate image url");
      setpreview(URL.createObjectURL(recipeData.recipeImage))
      setFileStatus(false)
    } else {
      console.log("Please Upload following file extension (png,  jpg,  jpeg) only");
      setFileStatus(true)
      setpreview("")
      setRecipeData({ ...recipeData, recipeImage: "" })
    }
  }, [recipeData.recipeImage])

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setRecipeData(prevRecipe => ({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, ingredientInput.trim()]
      }));
      setIngredientInput('');
    }
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients.splice(index, 1);
    setRecipeData(prevRecipe => ({
      ...prevRecipe,
      ingredients: newIngredients
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = value;
    setRecipeData(prevRecipe => ({
      ...prevRecipe,
      ingredients: newIngredients
    }));
  };

  const [username, setUsername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
    }
  }, [])

  const handleSaveRecipes = async () => {
    const token = sessionStorage.getItem("token")
    const username = sessionStorage.getItem("username")

    const { title, discription, ingredients, recipeImage, instructions, cookingTime, category } = recipeData
    if (!title || !discription || !ingredients || !recipeImage || !instructions || !cookingTime || !category) {
      toast.info("please fill the form completely!!!!")
    } else {
      //api call - reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("discription", discription)
      reqBody.append("ingredients", ingredients)
      reqBody.append("recipeImage", recipeImage)
      reqBody.append("instructions", instructions)
      reqBody.append("cookingTime", cookingTime)
      reqBody.append("category", category)
      reqBody.append("username", username)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        //api
        try {
          const result = await addRecipeAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status === 200) {
            console.log(result.data);
            toast.info("saved successfully")
            setAddRecipeResponse(true)
            handleClose()
          } else {
            toast.warning(result.response.data)
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  return (
    <>
      <Navbar style={{ width: '100%', height: "9vh", backgroundSize: 'cover', backgroundImage: `url('https://images.pexels.com/photos/4198715/pexels-photo-4198715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')` }} data-bs-theme="dark" className='fixed-top'>
        <Container>
          <Navbar.Brand style={{ fontFamily: '"Satisfy", cursive', fontSize: '25px' }} className='fw-bolder  ' >Tasty Tales</Navbar.Brand>
          <Nav className="ms-auto">
            <Button  onClick={handleLogout}  className='btn btn-dark'>Logout <i className="fa-solid fa-right-from-bracket ms-2"></i></Button>

          </Nav>
        </Container>
      </Navbar>
      <div className='row w-100' style={{ marginTop: '40px' }}>
        <div style={{ width: '330px', height: "130vh", backgroundSize: 'cover', backgroundImage: `url('https://images.pexels.com/photos/4198715/pexels-photo-4198715.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')` }} className='col-lg-3 text-light'>
          <div className='bg-transparent'>
            <h4 className='pt-5 pb-5 text-center'><b>Welcome Admin</b></h4>
            <Container className='fw-bolder ms-2'>
              <div className='mb-5'>
                <Link to='/admin' style={{ textDecoration: 'none', color: 'white' }}  ><b><i class="fa-solid fa-house-chimney"></i> Dashboard</b></Link>
                <br />
              </div>
              <div className='mb-5'>
                <Link to='/allrecipesadmin' style={{ textDecoration: 'none', color: 'white' }}  ><b><i class="fa-brands fa-slack"></i> All Recipes</b></Link>
                <br />
              </div>
              <div className='mb-5'>
                <Link to='/addrecipesadmin' style={{ textDecoration: 'none', color: 'white' }}  ><b><i class="fa-solid fa-user-plus"></i> Add Recipes</b></Link>
                <br />
              </div>
              <div className='mb-5'>
                <Link to='/adminrecipes' style={{ textDecoration: 'none', color: 'white' }}  ><b><i class="fa-solid fa-bowl-food"></i> Admin Recipes</b></Link>
                <br />
              </div>
            </Container>
          </div>
        </div>
        <div className="col-lg-9">
          <div className='ms-5' style={{ marginTop: '70px' }}>
            <div className='row shadow bg-light pt-3 ps-3 pe-3'>
              <h2><b> <img style={{ height: '50px', width: '50px' }} src={plus} alt="" /><u >ADD RECPIES</u></b><span className='ms-2' style={{ float: 'right' }}> <Button onClick={handleClose} variant="dark"><i class="fa-solid fa-xmark"></i></Button></span>  <span style={{ float: 'right' }}>  <Button onClick={handleSaveRecipes} variant="dark" >SAVE CHANGES</Button></span></h2>

              <hr />
              <div className='col-lg-6 mb-3'>
                <Form.Label><b>Recpie Title*</b>
                  <Form.Control style={{ width: '340px' }} aria-label="fullname" type="text" name="firstname" id="" required placeholder='Give your recpie a title' value={recipeData.title} onChange={e => setRecipeData({ ...recipeData, title: e.target.value })} />
                </Form.Label>
                <br />

                <Form.Label className='mt-3'><b>discription*</b>
                  <Form.Control style={{ width: '340px' }} as="textarea" type="text" name="firstname" id="" required placeholder='A short note on Recipe' value={recipeData.discription} onChange={e => setRecipeData({ ...recipeData, discription: e.target.value })} />
                </Form.Label>
                <br />
                <b>Ingredients*</b>
                <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).</p>


                {recipeData.ingredients.map((ingredient, index) => (
                  <div className='mb-3 d-flex' key={index}>
                    <input
                      type="text"
                      className='form-control'
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={e => handleIngredientChange(index, e.target.value)}
                    />
                    <Button variant="dark ms-3" onClick={() => handleDeleteIngredient(index)}>
                      <i className="fa-solid fa-xmark text-white"></i>
                    </Button>
                  </div>
                ))}
                <div className='mb-3 d-flex'>
                  <input
                    type="text"
                    className='form-control'
                    placeholder={`Ingredient ${recipeData.ingredients.length + 1}`}
                    value={ingredientInput}
                    onChange={e => setIngredientInput(e.target.value)}
                  />
                </div>
                <Button variant="dark  pt-2 pb-2 ps-4 pe-4" onClick={handleAddIngredient}>Add Ingredients</Button>





              </div>
              <div className='col-lg-6'>
                <h5 className='ms-2'><b>Photo*</b></h5>
                <label  >
                  <input style={{ display: 'none' }} type="file" onChange={e => setRecipeData({
                    ...recipeData, recipeImage
                      : e.target.files[0]
                  })} />
                  <img style={{ backgroundColor: 'white' }} className='m-2  ' width={'250px'} height={'250px'} src={preview ? preview : uploadImg} alt="uploaded image" />
                  {fileStatus && <div className='text-danger mt-2' > *Please Upload File eith following extensions (png, jpg, jpeg) only* </div>}
                </label>
              </div>
              <hr />
              <Form.Label className='mt-3'><b>Instructions*</b>
                <Form.Control as="textarea" type="text" name="firstname" id="" required placeholder='Explain how to make your recipe' value={recipeData.instructions} onChange={e => setRecipeData({ ...recipeData, instructions: e.target.value })} />
              </Form.Label>
              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Cooking Time ' value={recipeData.cookingTime} onChange={e => setRecipeData({ ...recipeData, cookingTime: e.target.value })} /></div>
              <div className='mb-4'>
                <select className='form-select' value={recipeData.category} onChange={e => setRecipeData({ ...recipeData, category: e.target.value })} >
                  <option value="">Select a category</option>
                  <option value="Other">Soups</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

            </div>
          </div>

          <ToastContainer autoClose={3000} theme='colored' />
        </div>
      </div>
    </>
  )
}

export default AddRecipesAdmin