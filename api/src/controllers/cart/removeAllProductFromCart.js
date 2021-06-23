const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const removeAllProductFromCart = {
    removeAllProduct: async (req, res) =>{
        let {orderid, user_id} = req.body
        if(user_id !== ''){
            //Si es un carrito de un usuario
            const orderactual = await Order.findOne({where: {id_order: orderid}})
            const ordersdetail = await OrderDetail.findAll({where: {OrderIdOrder: orderactual.id_order}})
            for(const product of ordersdetail){
                await OrderDetailCaracteristic.destroy({where: {OrderDetailIdOrderDetail: product.dataValues.id_order_detail}}) 
            }
            await OrderDetail.destroy({where: {OrderIdOrder: orderactual.id_order}})
            res.send('Carrito Vaciado')
        }
    }
}

module.exports = removeAllProductFromCart;