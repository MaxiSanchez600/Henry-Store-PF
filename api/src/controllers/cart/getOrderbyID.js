const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const addCart = require('../controllersUtils/cart');

const setPriceHcReturnID = {
    setCartPriceReturnID: async (req, res, next) =>{
        const {userid, price, hc} = req.body
        Order.update({totalprice: price, spenthc: hc},{where: {[Op.and]: [{status: 'carrito'}, {UserIdUser: userid}]}})
        .then(() => {
            return Order.findOne({where: {[Op.and]: [{status: 'carrito'}, {UserIdUser: userid}]}})
        })
        .then(value =>{
            res.send(value)
        })
        .catch(error =>{
            next(error)
        })
    }
}

const getOrder = {
    getOrderComplete: async (req, res, next) =>{
        res.send(req.params)
    }
}
module.exports = setPriceHcReturnID