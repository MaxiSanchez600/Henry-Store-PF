const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const {getCart} = require('../controllersUtils/cart');

const getOrderDetails = {
    getDetails: async (req, res) =>{
        let user_id = req.query.userid
         if(user_id !== ''){
             const order = await Order.findOne({ 
                 where: { [Op.and]: [ {status: 'carrito'}, {UserIdUser: user_id} ]} 
             });
             if(order === null){
                 //No existe carrito activo para el usuario => Lo creo
                 const neworder = await Order.create({status: 'carrito', UserIdUser: user_id})
                 //Devuelvo un objeto vacio ya que no tiene productos en el carrito la ser uno nuevo
                 res.json([])
             }
             else{
                 //Existe carrito activo, busco sus products y armo el json
                 const results = await getCart(order.id_order)
                 res.send(results)
             }
         }
    }
}

module.exports = getOrderDetails;