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
            const { 
                id_user,
                id_product
            } = req.body;

            const wishlist = await Wishlist.findOrCreate({
                where: {
                    UserIdUser: id_user,
                    ProductIdProduct: id_product
                }
            });

            return res.send(wishlist);
        } catch (error) {
            return next(error);
        }
    },
    deleteWishlist: async (req, res, next) => {
        try {
            const { 
                id_user,
                id_product
            } = req.body;
            
            const deleted = await Wishlist.destroy({
                where: {
                    UserIdUser: id_user,
                    ProductIdProduct: id_product
                }
            });

            if(deleted) return res.sendStatus(200);
            else return res.send('No hubo match');
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = wishlistController;