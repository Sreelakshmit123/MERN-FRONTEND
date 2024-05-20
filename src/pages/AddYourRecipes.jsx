import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import profile from '../assets/images/profile.png'
import { Link } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import plus from '../assets/images/plus.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import uploadImg from '../assets/images/uploadImg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addRecipeAPI } from '../Services/allAPIs';
import { addReciperesponseContext } from '../Context API/ContextShare';

function AddYourRecipes() {
  const {addReciperesponse,setAddRecipeResponse}= useContext(addReciperesponseContext)
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

      <Header />
      <Container >
        <Row id='addrecipes'>
          <Col sm={5}>
            
            <div style={{ marginTop: "100px" }}>
              <ButtonGroup className='border ' vertical >
                <div className='col-lg-12 pb-2'>
                  <img style={{ height: '50px', width: '50px' }} className=' bg-dark ' src={profile} alt="" /> <span style={{ fontFamily: '"Satisfy", cursive', fontSize: '30px' }} className='ps-4 text-dark ms-1 pt-2 pb-2 ps-5 pe-4 rounded'><b>hi , {username?.split(" ")[0]}</b></span>
                </div>
                <Button style={{ paddingLeft: '160px', paddingRight: '160px' }} className='btn btn-dark '><Link to={'/profile'} style={{ textDecoration: 'none', color: "white" }}>My Profile </Link></Button>
                <Button className='btn btn-dark '> <Link to={'/personalrecipes'} style={{ textDecoration: 'none', color: "white" }}>All Personal Recpies </Link></Button>
                <Button className='btn btn-dark '>  <Link to={'/favorite'} style={{ textDecoration: 'none', color: "white" }}> Saved Recpies </Link>
                </Button>
              </ButtonGroup>
              <img className='imagerecpie2 mt-5' src="https://www.ismartcom.com/hubfs/original.gif" alt="" />
            </div>
          </Col>
          <Col sm={7}>
            <div style={{ marginTop: '100px' }}>
              <div className='row shadow bg-light pt-3 ps-3 pe-3'>
                <h2><b> <img style={{ height: '50px', width: '50px' }} src={plus} alt="" /><u >ADD RECPIES</u></b><span className='ms-2' style={{ float: 'right'}}> <Button onClick={handleClose} variant="dark"><i class="fa-solid fa-xmark"></i></Button></span>  <span style={{ float: 'right' }}>  <Button onClick={handleSaveRecipes} variant="dark" >SAVE CHANGES</Button></span></h2>
              
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the Allrecipes community.</p>
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
          </Col>
          <ToastContainer autoClose={3000} theme='colored' />
        </Row>
      </Container>
      <Footer />
      <div class="up-arrow icon">
                <a href="#addrecipes"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default AddYourRecipes
