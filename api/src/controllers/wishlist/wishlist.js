const { Wishlist, Product, Image } = require('../../db');

const wishlistController = {
    getWishlist: async (req, res, next) => {
        try {
            const { id_user } = req.query;

            const wishlists = await Wishlist.findAll({
                where: {
                    UserIdUser: id_user
                }
            });

            const productsMapped = wishlists.map(wishlist => {
                return Product.findOne({
                    where: {
                        id_product: wishlist.ProductIdProduct
                    },
                    attributes: ['id_product', 'name', 'price', 'description'],
                    include: [
                        { model: Image, attributes: ['id_image', 'name_image'] }
                    ]
                })
            });
            const wishlistProducts = await Promise.all(productsMapped);

            return res.send(wishlistProducts);
        } catch (error) {
            return next(error);
        }
    },
    addWishlist: async (req, res, next) => {
        try {
            return res.send('add wishlist');
        } catch (error) {
            return next(error);
        }
    },
    deleteWishlist: async (req, res, next) => {
        try {
            return res.send('delete wishlist');
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = wishlistController;