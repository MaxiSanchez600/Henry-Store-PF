const { Review, User } = require('../../db');

const reviewsController = {
    getReviews: async (req, res, next) => {
        try {
            const { id_product } = req.query;

            //busco todas las reviews para ese producto
            const reviews = await Review.findAll({
                where: {
                    ProductIdProduct: id_product
                }
            });

            //por cada review encontrado busco al usuario que la hizo
            const reviewsMapped = reviews.map( review => {
                return User.findByPk(review.UserIdUser)
            });
            const usersOfReviews = await Promise.all(reviewsMapped);

            //integro la informacion de ambas busquedas y armo el arreglo que voy a devolver
            let result = [];
            for(let i = 0; i < reviews.length; i++) {
                let objResult = {
                    id_review: reviews[i].id_review,
                    score: reviews[i].score,
                    content: reviews[i].content,
                    createdAt: reviews[i].createdAt,
                    updatedAt: reviews[i].updatedAt,
                    name: usersOfReviews[i].name,
                    last_name: usersOfReviews[i].last_name,
                    username: usersOfReviews[i].username,
                    UserIdUser: usersOfReviews[i].id_user,
                    imageUser: usersOfReviews[i].image,
                }
                result.push(objResult);
            }
            
            return res.send(result);

        } catch (error) {
            return next(error);
        }
    },
    addReview: async (req, res, next) => {
        try {
            const {
                score,
                content,
                id_product,
                id_user
            } = req.body;

            const review = await Review.create({
                score: score,
                content: content,
                ProductIdProduct: id_product,
                UserIdUser: id_user
            });

            return res.send(review);

        } catch (error) {
            return next(error);
        }
    }
};

module.exports = reviewsController;