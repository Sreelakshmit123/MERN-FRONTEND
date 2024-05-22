import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getSingleRecipeAPI } from '../Services/allAPIs';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../Services/serverURL';
import RatingRecipe from './RatingRecipe';
import ShareRecipe from './ShareRecipe';

function RecipesView() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const [recipeData, setRecipeData] = useState({
    title: "",
    discription: "",
    ingredients: [],
    recipeImage: "",
    instructions: "",
    cookingTime: "",
    category: "",
    username: ""
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams()
  const viewRecipe = async () => {
    try {
      const result = await getSingleRecipeAPI(id);
      if (result.status === 200) {
        setRecipeData(result.data);
      } else {
        alert(result.response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    viewRecipe();
  }, []);


  return (
    <>

      <Header />
      <div style={{ marginTop: '100px' }}>

        {loading ? (

          <div>Loading...</div>

        ) : (
          <div id='recipeview' className='container bg-light fw-bolder'>
            <div className='row'>
              <div className='col-lg-7 pb-5 pt-5 ps-5'>
                <div className='d-flex justify-content-between'>
                  <h1 className='text-dark'><b>{recipeData.title}</b></h1>
                  {/* <recipepdf /> */}
                  <ShareRecipe recipeData={recipeData} />
                </div>
                <br />
                <p><b>{recipeData.discription}</b></p>
                <br />
                <img className='recipeview mb-5' src={`${SERVER_URL}/uploads/${recipeData.recipeImage}`} alt="" />


                <br />
                <h3 className='text-dark'><b>Instructions</b> </h3>
                <ol>
                  {recipeData.instructions && recipeData.instructions[0] && recipeData.instructions[0].split(',').map((instruction, index) => (
                    <li className='fs-5 pb-3' key={index}>{instruction.trim()}</li>
                  ))}
                </ol>

              </div>
              <div className="col-lg-5 pb-5 pt-5 pe-5 ps-5">
                <h3 className='text-dark mt-5 pb-3'><b>Ingredients</b></h3>
                <ol>
                  {recipeData.ingredients && recipeData.ingredients[0] && recipeData.ingredients[0].split(',').map((ingredient, index) => (
                    <li className='fs-5 pb-3' key={index}>{ingredient.trim()}</li>
                  ))}
                </ol>
                <br />
                <h5 className='mb-5 text-dark'><b>cooking time : <span className='text-danger'>{recipeData.cookingTime}</span></b></h5>

                <br />
                <h3 className='text-dark'><b>Rating</b></h3>
                <div style={{ backgroundColor: 'white', height: "150px" }} className='container mt-3 '>
                  <div>

                    <RatingRecipe totalStars={5} onRate={handleRatingChange} />
                    <p style={{ fontSize: '25px' }} className='mt-3'>Selected Rating: {rating} stars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <div class="up-arrow icon">
        <a href="#recipeview"><i class="fa-solid fa-angle-up brand"></i></a>
      </div>
    </>
  )
}

export default RecipesView