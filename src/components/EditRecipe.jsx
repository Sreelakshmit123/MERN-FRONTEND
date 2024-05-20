import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Container, Form,Modal } from 'react-bootstrap';
import plus from '../assets/images/plus.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editRecipeAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverURL';
import { editRecipeResponseContext } from '../Context API/ContextShare';


function EditRecipe({recipes}) {
    console.log("when edit icon click:", recipes);
    const {editRecipeResponse,setEditRecipeResponse}=useContext(editRecipeResponseContext)
    const handleShow = () => setLgShow(true);
    const [lgShow, setLgShow] = useState(false);  

  const [preview, setPreview] = useState("")
  const [recipeData, setRecipeData] = useState({
    id: recipes._id, title: recipes.title, discription: recipes.discription, ingredients: recipes.ingredients[0].split(','),recipeImage: "", instructions: recipes.instructions[0].split(','),cookingTime: recipes.cookingTime, category: recipes.category
  })

  useEffect(() => {
    if (recipeData.recipeImage) {
      setPreview(URL.createObjectURL(recipeData.recipeImage))
    } else {
      setPreview("")
    }
  }, [recipeData.recipeImage])


  const handleCancel = (e) => {
    e.preventDefault()
    setRecipeData(
      {
        id: recipes._id, title: recipes.title, discription: recipes.discription, ingredients: recipes.ingredients,recipeImage: "",  instructions: recipes.instructions,cookingTime: recipes.cookingTime, category: recipes.category, username: recipes.username
      }
    )
    setPreview("")
  }
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;
    setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    const updatedIngredients = [...recipeData.ingredients, ""];
    setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const handleDeleteIngredient = (indexToRemove) => {
    const updatedIngredients = recipeData.ingredients.filter((_, index) => index !== indexToRemove);
    setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  
  const [username, setUsername] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"))
    } else {
      setUsername("")
    }
  }, [])



  const handleUpdate = async (e) => {
    e.preventDefault()
    const { id, title, discription, ingredients, recipeImage, instructions, cookingTime, category, username } = recipeData
    let uname=sessionStorage.getItem("username")
    

    if (!title || !discription  || !instructions  || !cookingTime || !category || ingredients.some(ingredient => ingredient.trim() === "")) {
      toast.warning("Please fill the form Completely!!!")
    } else {
      //api call-reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("discription", discription)
      reqBody.append("ingredients", ingredients)
      reqBody.append("instructions", instructions)
      reqBody.append("cookingTime", cookingTime)
      reqBody.append("category", category)
      reqBody.append("username", uname)
      preview?reqBody.append("recipeImage",recipeImage):reqBody.append("recipeImage",recipes.recipeImage)

      //req-header
      const token = sessionStorage.getItem("token")
      if (token) {

        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }

        //api call
        try {

          const result = await editRecipeAPI(id, reqBody, reqHeader)
          console.log(result);
          if(result.status==200){
            setLgShow(false)
            setEditRecipeResponse(result.data)

          }else{
            toast.warning(result.response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <>

     
      <Container >
     
      <button className='btn fs-5' onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button>
      <Modal className='w-100 ' size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body className=' shadow bg-light'>
     
              <div className='row pt-3 ps-3 pe-3'>
                
                <h2><b> <img style={{ height: '50px', width: '50px' }} src={plus} alt="" /><u >UPDATE RECPIES</u></b><span className='ms-2' style={{ float: 'right'}}> <Button onClick={handleCancel} variant="dark"><i class="fa-solid fa-xmark"></i></Button></span>  <span style={{ float: 'right' }}>  <Button onClick={handleUpdate} variant="dark" >SAVE CHANGES</Button></span></h2>
              
                <p>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the Allrecipes community.</p>
                <hr />
                  <Form.Label><b>Recpie Title*</b>
                    <Form.Control aria-label="fullname" type="text" name="firstname" id="" required placeholder='Give your recpie a title' value={recipeData.title} onChange={e => setRecipeData({ ...recipeData, title: e.target.value })} />
                  </Form.Label>
                  <br />

                  <Form.Label className='mt-3'><b>discription*</b>
                    <Form.Control as="textarea" type="text" name="firstname" id="" required placeholder='A short note on Recipe' value={recipeData.discription} onChange={e => setRecipeData({ ...recipeData, discription: e.target.value })} />
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
                 
                  <Button variant="dark  pt-2 pb-2 ps-4 pe-4" onClick={handleAddIngredient}>Add Ingredients</Button>





                <div className='col-lg-6'>
                  <h5 className='ms-2'><b>Photo*</b></h5>
                  <label  >
                    <input style={{ display: 'none' }} type="file" onChange={e => setRecipeData({ ...recipeData,recipeImage: e.target.files[0] })} />
                    <img style={{ backgroundColor: 'white' }} className='m-2  ' width={'250px'} height={'250px'} src={preview ? preview : `${SERVER_URL}/uploads/${recipes.recipeImage}`} alt="uploaded image" />
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
          
          <ToastContainer autoClose={3000} theme='colored' />
          </Modal.Body>
        
        </Modal>

      </Container>
     
    </>
  )
}

export default EditRecipe























