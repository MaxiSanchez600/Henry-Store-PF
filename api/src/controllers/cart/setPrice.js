const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const addCart = require('../controllersUtils/cart');

const setPriceHcReturnID = {
    setCartPriceReturnID: async (req, res, next) =>{
        const {userid, price, hc, hccart} = req.body
        console.log(price)
        Order.update({totalprice: price, spenthc: hc, givenhc: hccart},{where: {[Op.and]: [{status: 'carrito'}, {UserIdUser: userid}]}})
        .then(() => {
            return Order.findOne({where: {[Op.and]: [{status: 'carrito'}, {UserIdUser: userid}]}})
        })
        .then(value =>{
            res.send(value)
        })
        .catch(error =>{
            next(error)
        })
    },
    getOrderComplete: async (req, res, next) =>{
            const id = req.query.id
            Order.findOne({where: {id_order: id}})
            .then(value =>{
                res.send(value.dataValues)
            })
            .catch(error =>{
                next(error)
            })
    }
}

module.exports = setPriceHcReturnID