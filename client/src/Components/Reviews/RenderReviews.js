import React from "react";
import StarRating from './StarRating.js'


const RenderReviews= ({ reviewsToRender }) => {return (
    <ul>
                {
                    reviewsToRender && reviewsToRender.map(review => {
                        return <div className="card_review">
                            <label className="score_label" >
                                <img src={review.imageUser} alt="not found" />
                                <div className="user_info" >
                                    <h4>{review.name + " " + review.last_name}</h4>
                                    <h5>@{review.username}</h5>
                                </div>
                                <StarRating size_star="15" score={review.score} editable="off" /> <p>  - posted: {review.createdAt}</p>
                            </label>
                            <p className="opinion_text">{review.content}</p>
                        </div>
                    })
                }
    </ul>
  );
};
export default RenderReviews;