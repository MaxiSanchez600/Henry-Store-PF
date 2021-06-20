const {Order, OrderDetail, OrderDetailCaracteristic, User, Role} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const {addCart} = require('../controllersUtils/cart');

const addProductToCart = {
    addProduct: async (req, res) =>{
        let {user_id, product_id, amount, caracteristics} = req.body
            console.log(req.body)
            if(user_id !== ''){
                const order = await Order.findOne({ 
                    where: { [Op.and]: [ {status: 'carrito'}, {UserIdUser: user_id} ]} 
                });
                if(order === null){
                    //No existe carrito activo para el usuario => Lo creo
                    const neworder = await Order.create({status: 'carrito', UserIdUser: user_id})
                    await addCart(product_id, amount, caracteristics, neworder.id_order)
                    res.send('Producto Anadidos user nuevo')
                }
                else{
                    //Existe carrito activo
                    await addCart(product_id, amount, caracteristics, order.id_order)
                    res.send('Producto Anadidos')
                }
            }
    }
}


module.exports = addProductToCart;