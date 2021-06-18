const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const addCart = require('../controllersUtils/cart');

const editProductInCart = {
    editProduct: async (req, res) =>{
        let {order_detail, new_amount, user_id} = req.body
        console.log(req.body)
        if(user_id !== ''){
            //Si es un carrito de un usuario
            const orderdetail = await OrderDetail.findOne({where: {id_order_detail: order_detail}})
            orderdetail.product_amount = new_amount;
            await orderdetail.save();
            res.send('Producto editado')
        }
    }
}

module.exports = editProductInCart;