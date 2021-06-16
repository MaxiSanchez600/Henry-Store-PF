const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const removeProductFromCart = {
    removeProduct: async (req, res) =>{
        let {orderdetail_id, user_id} = req.body
        if(user_id !== ''){
            //Si es un carrito de un usuario
            await OrderDetailCaracteristic.destroy({where: {OrderDetailIdOrderDetail: orderdetail_id}})        
            const orderdetail = await OrderDetail.findOne({where: {id_order_detail: orderdetail_id}})
            await orderdetail.destroy();
            res.send('Producto borrado')
        }
    }
}

module.exports = removeProductFromCart;