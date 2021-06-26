import React from 'react'
import { connect } from 'react-redux';
import { getAllReviews } from '../../Redux/actions/actionsProducts';
import StarRating from './StarRating.js'
import './LoadMore.js'

const ReviewsExample = require('./Reviews_example.json')

const AllReviews = () => {
    let averageScore = 0;
    let fivestar = 0, fourstar = 0, threestar = 0, twostar = 0, onestar = 0;
   
    // ! CONTENT
    return <div className="content_Reviews">
        <h1>Reseña sobre el producto:</h1>
        {
            ReviewsExample && ReviewsExample.map(review => {
                averageScore += review.score;
                if (review.score > 4 && review.score <= 5) fivestar += 1
                if (review.score > 3 && review.score <= 4) fourstar += 1
                if (review.score > 2 && review.score <= 3) threestar += 1
                if (review.score > 1 && review.score <= 2) twostar += 1
                if (review.score >= 0 && review.score <= 1) onestar += 1
            })
        }
        <div className="content_averageRating">
            <div className="left_rating">
                <p className="main_point">{(averageScore / ReviewsExample.length).toFixed(1)}</p>
                <StarRating size_star="30" score={averageScore / ReviewsExample.length} editable="off" completeinfo="no" />
                <h4>Promedio entre {ReviewsExample.length} opiniones</h4>
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
                                <span class="fill__background" style={{ width: ((fivestar * 100) / ReviewsExample.length) + "%" }}></span>
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
                                <span class="fill__background" style={{ width: ((fourstar * 100) / ReviewsExample.length) + "%" }}></span>
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
                                <span class="fill__background" style={{ width: ((threestar * 100) / ReviewsExample.length) + "%" }}></span>
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
                                <span class="fill__background" style={{ width: ((twostar * 100) / ReviewsExample.length) + "%" }}></span>
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
                                <span class="fill__background" style={{ width: ((onestar * 100) / ReviewsExample.length) + "%" }}></span>
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
                {
                    ReviewsExample && ReviewsExample.map(review => {
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
            </div>
            <a href="#" id="loadMore">Load More</a>
        </div>
    </div>
}

function mapStateToProps(state) {
    return {
        ListProducts: state.products.products,
        userid: state.user_id,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllReviews: (allQueries) => dispatch(getAllReviews(allQueries)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews);