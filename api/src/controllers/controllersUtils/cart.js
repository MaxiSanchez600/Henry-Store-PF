const {Caracteristic, Product, Order, OrderDetail, OrderDetailCaracteristic, User, Image} = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const addCart = async (product_id, amount, caracteristics, orderid) => {
    console.log('addcart')
    //Creo el orderdetail => producto => creo los orderdetailcaracteristic => categorias del producto
    const orderdetail = await OrderDetail.create({ 
                                product_amount: amount,
                                OrderIdOrder: orderid,
                                ProductIdProduct: product_id
                        })
       for(const name in caracteristics){
            await OrderDetailCaracteristic.create({
                caracteristic_id: name,
                value_caracteristic: caracteristics[name],
                OrderDetailIdOrderDetail: orderdetail.id_order_detail
            })
        }
    return;
}

 const getCart = async (orderid) =>{
    console.log('getCart')
    let productos = []
    const orderdetails = await OrderDetail.findAll({where: {OrderIdOrder: orderid}, order: ['id_order_detail']})
    for(const orderdetail of orderdetails){
        //Agarro todo lo que puedo
        console.log(orderdetail)
        let caracteristics = {}
        let productid = orderdetail.ProductIdProduct
        let orderid = orderdetail.id_order_detail
        let amount = orderdetail.product_amount

        //Me traigo el product para buscar su stock maximo
        let product = await Product.findOne({where: {id_product: productid}})
        let image = await Image.findOne({where: {ProductIdProduct: productid}})
        //Me traigo las categorias del actual y creo el objeto caracteristic
        const orderdetails_carac = await OrderDetailCaracteristic.findAll({where: {OrderDetailIdOrderDetail: orderdetail.id_order_detail}})
        for(const carac of orderdetails_carac){
            //Por cada carateristic ID de el producto, busco el nombre para mostrar en la tabla caracteristic
            const idname = await Caracteristic.findOne({where: {id_caracteristic: carac.dataValues.caracteristic_id}})
            caracteristics[idname.dataValues.name_caracteristic] = carac.dataValues.value_caracteristic
        }

        //Agrego un objeto nuevo (producto) al array de productos de la order
        productos.push({
            product_id: productid,
            product_name: product.dataValues.name,
            orderdetail_id: orderid,
            actual_amount: amount,
            amount_max: product.dataValues.unit_stock,
            precio: product.dataValues.price,
            hc: product.dataValues.henry_coin,
            image: image.name_image,
            caracteristics: caracteristics
        })
    }
    return productos
 }
module.exports = {addCart, getCart}
