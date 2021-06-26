import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ size_star, score, editable, completeinfo }) => {
    const [rating, setRating] = useState(score);
    const [hover, setHover] = useState(null)

    return <div className="StarRating">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
                <label>
                    <input
                        className="star_radio_on"
                        disabled={editable === "on" ? false : true}
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                    />

                    {
                        editable == "on" ? <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={size_star}
                            {...console.log("prueba")}
                            onMouseEnter={() => { setHover(ratingValue) }}
                            onMouseLeave={() => { setHover(null) }}
                        /> : <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={size_star}
                        />
                    }
                </label>
            )
        })}
      {  completeinfo !== "no" ? <p className="label_rating" >({rating}) - </p> : <p className="label_rating" ></p>}
    </div>
}

export default StarRating