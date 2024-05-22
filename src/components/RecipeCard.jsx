import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Link, useNavigate, } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToSaveAPI, deleteRecipeAPI } from '../Services/allAPIs';
import { SERVER_URL } from '../Services/serverURL';
import EditRecipe from './EditRecipe'

function RecipeCard({ personalRecipes, recipes }) {

  const navigate = useNavigate()
  const [isSave, setIsSaved] = useState(false);
  const [saveRecipe, setSaveRecipe] = useState([])
  
  const handleImg = () => {
    console.log(recipes);
    const { _id } = recipes
    navigate(`/view/${_id}`)
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

  const handleSaved = async (saverecipe) => {
    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {

        const result = await addToSaveAPI(saverecipe, reqHeader)
        if (result.status == 200) {
          setIsSaved(!isSave);
          console.log("save list:", result);
          setSaveRecipe(result.data)
        } else {
          toast.info(result.response.data)
          console.log(result);
        }

      } catch (err) {
        console.log("save err:", err);
      }
    }else{
      toast.info("Please login to save your changes!")
    }


  }

  return (
    <>

      <div>
        {recipes && <Card style={{ width: '18rem', height: '23.5rem'}} className='recipescard'>

          <Card.Img className='recipesimg' style={{ width: '18rem', height: '16.5rem' }} onClick={handleImg} variant="top" src={`${SERVER_URL}/uploads/${recipes.recipeImage}`} />

          <Card.Body>
            <Card.Title>{recipes?.title}{personalRecipes?
              <div className='d-flex'>
                <EditRecipe recipes={recipes} />
                <button onClick={() => handleDeleteRecipe(recipes?._id)} className='btn fs-5'><i className="fa-solid fa-trash text-danger"></i></button>
              </div>
              :
              <span style={{ float: 'right' }}>  <Button onClick={() => handleSaved(recipes)} variant="dark" ><i className={isSave ? "fa-solid fa-bookmark text-danger" : "fa-solid fa-bookmark "}></i></Button></span>}</Card.Title>
              <div className='text-dark'>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
              </div>
          </Card.Body>
        </Card>}
      </div>
      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default RecipeCard