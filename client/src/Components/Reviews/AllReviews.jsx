import React, { useState, useEffect } from 'react'
import StarRating from './StarRating.js'
import './RenderReviews.js'
import RenderReviews from './RenderReviews'


const AllReviews = ({ ReviewsProduct }) => {
    let total_reviews = ReviewsProduct && ReviewsProduct.length !== 0 ? ReviewsProduct.length : 1;
    let averageScore = 0;
    let fivestar = 0, fourstar = 0, threestar = 0, twostar = 0, onestar = 0;

    // ! CONTENT DETAIL PRODUCT
    return (
        <div className="content_Reviews">
            {ReviewsProduct && ReviewsProduct.length == 0 ? '' :
                <div>
                    {
                        ReviewsProduct && ReviewsProduct.map(review => {
                            averageScore += review.score;
                            if (review.score > 4 && review.score <= 5) fivestar += 1
                            if (review.score > 3 && review.score <= 4) fourstar += 1
                            if (review.score > 2 && review.score <= 3) threestar += 1
                            if (review.score > 1 && review.score <= 2) twostar += 1
                            if (review.score >= 0 && review.score <= 1) onestar += 1
                        })
                    }
                    <h1>Reseña sobre el producto:</h1>

    {/* ! CONTENT REVIEWS */}
                    <div className="content_averageRating">
                        <div className="left_rating">
                            <p className="main_point">{(averageScore / total_reviews).toFixed(1)}</p>
                            <StarRating size_star="30" score={averageScore / total_reviews} editable="off" completeinfo="no" />
                            <h4>Promedio entre {total_reviews} opiniones</h4>
                        </div>
                        <div className="rigth_rating">
                            <ul className="ul_star">
                                <li className="li_star">
                                    <div className="name_star">
                                        <span className="span_name_star">
                                            5 estrellas
                                        </span>
                                    </div>
                                    <div className="content_bars">
                                        <div className="bars_rating">
                                            <span class="bar__background"></span>
                                            <span class="fill__background" style={{ width: ((fivestar * 100) / total_reviews) + "%" }}></span>
                                        </div>
                                    </div>
                                    <div className="total_points">
                                        <div className="points_label">
                                            {fivestar}</div>
                                    </div>
                                </li>

                                <li className="li_star">
                                    <div className="name_star">
                                        <span className="span_name_star">
                                            4 estrellas
                                        </span>
                                    </div>
                                    <div className="content_bars">
                                        <div className="bars_rating">
                                            <span class="bar__background"></span>
                                            <span class="fill__background" style={{ width: ((fourstar * 100) / total_reviews) + "%" }}></span>
                                        </div>
                                    </div>
                                    <div className="total_points">
                                        <div className="points_label">
                                            {fourstar}</div>
                                    </div>
                                </li>

                                <li className="li_star">
                                    <div className="name_star">
                                        <span className="span_name_star">
                                            3 estrellas
                                        </span>
                                    </div>
                                    <div className="content_bars">
                                        <div className="bars_rating">
                                            <span class="bar__background"></span>
                                            <span class="fill__background" style={{ width: ((threestar * 100) / total_reviews) + "%" }}></span>
                                        </div>
                                    </div>
                                    <div className="total_points">
                                        <div className="points_label">
                                            {threestar}</div>
                                    </div>
                                </li>

                                <li className="li_star">
                                    <div className="name_star">
                                        <span className="span_name_star">
                                            2 estrellas
                                        </span>
                                    </div>
                                    <div className="content_bars">
                                        <div className="bars_rating">
                                            <span class="bar__background"></span>
                                            <span class="fill__background" style={{ width: ((twostar * 100) / total_reviews) + "%" }}></span>
                                        </div>
                                    </div>
                                    <div className="total_points">
                                        <div className="points_label">
                                            {twostar}</div>
                                    </div>
                                </li>

                                <li className="li_star">
                                    <div className="name_star">
                                        <span className="span_name_star">
                                            1 estrella
                                        </span>
                                    </div>
                                    <div className="content_bars">
                                        <div className="bars_rating">
                                            <span class="bar__background"></span>
                                            <span class="fill__background" style={{ width: ((onestar * 100) / total_reviews) + "%" }}></span>
                                        </div>
                                    </div>
                                    <div className="total_points">
                                        <div className="points_label">
                                            {onestar}</div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="container_allreviews ">
                        <div className="flex">
                            <RenderReviews reviewsToRender={ReviewsProduct} />
                        </div>
                    </div>
                </div>}




        </div>
    )
}

export default AllReviews