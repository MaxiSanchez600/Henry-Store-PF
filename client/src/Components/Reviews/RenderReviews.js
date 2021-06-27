import React, { useState, useEffect } from "react";
import StarRating from './StarRating.js'
import anonymous_user from '../../Assets/Images/anonymous_user.png'
import { RiArrowDownSLine } from "react-icons/ri";

const RenderReviews = ({ reviewsToRender }) => {
    const [reviewsToShow, setReviewsToShow] = useState([]);
    const [next, setNext] = useState(3);
    const reviewsPerPage = 3;
    const loopWithSlice = (start, end) => {
        const slicedPosts = reviewsToRender ? reviewsToRender.slice(start, end) : [];
        setReviewsToShow(slicedPosts);
    };

    useEffect(() => {
        loopWithSlice(0, reviewsPerPage);
    }, []);

    const handleShowMorePosts = () => {
        loopWithSlice(0, next + reviewsPerPage);
        setNext(next + reviewsPerPage);
    };

    return (
        <div className="rendered_reviews_container">
            {
                reviewsToShow && reviewsToShow.map(review => {
                    return <div className="card_review">
                        <label className="score_label" >
                            {review.name == null ? <img src={anonymous_user} alt="not found" /> : <img src={review.imageUser} alt="not found" />}
                            <div className="user_info" >
                                {review.name == null ? <h4>Usuario Anónimo</h4> : <h4>{review.name + " " + review.last_name}</h4>}
                                {review.name == null ? <h5>@anonymous</h5> : <h5>@{review.username}</h5>}
                            </div>
                            <StarRating size_star="15" score={review.score} editable="off" /> <p>  - posted: {review.createdAt}</p>
                        </label>
                        <p className="opinion_text">{review.content}</p>

                    </div>
                })
            }
            <div className={reviewsToShow.length !==7 ? "container2" : "hidden"}>
                <div className="bg"></div>
               
                <div className="button loadMore" onClick={handleShowMorePosts}><RiArrowDownSLine /> <span>VER MÁS</span></div>
            </div>
        </div>


    );
};
export default RenderReviews;