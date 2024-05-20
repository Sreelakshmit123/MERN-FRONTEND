import React, { useState } from 'react'

function RatingRecipe({ totalStars, selectedStars, onRate }) {
   
    const [rating, setRating] = useState(selectedStars);
  
    const handleStarClick = (starIndex) => {
      setRating(starIndex + 1);
      onRate(starIndex + 1);
    };
  return (
    <>
        <div>
      {[...Array(totalStars)].map((_, index) => (
        <span 
          key={index}
          onClick={() => handleStarClick(index)}
          style={{ cursor: 'pointer', color: index < rating ? 'maroon' : 'gray' ,fontSize:'40px'}}
        >
<i class="fa-solid fa-star"></i>       
 </span>
      ))}
    </div>
    </>
  )
}

export default RatingRecipe