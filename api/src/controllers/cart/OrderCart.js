const {Order, OrderDetail, OrderDetailCaracteristic, User, Product} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const OrderCart = {
    removeStock: async (req, res, next) =>{
        const {orderid} = req.query
        OrderDetail.findAll({where:{OrderIdOrder: orderid}})
        .then(value =>{
            let products = []
            value.forEach(orderdetail =>{
                products.push(Product.findOne({where: {id_product: orderdetail.ProductIdProduct}})
                                .then(async value =>{
                                    value.unit_stock = value.unit_stock - orderdetail.product_amount
                                    await value.save()
                }))
            })
            Promise.all(products)
            .then(value =>{
                res.send("Borrado")
            })
            .catch(error =>{
                next(erorr)
            })
        })
    },

    addStock: async (req, res) =>{
        const {orderid} = req.query
        OrderDetail.findAll({where:{OrderIdOrder: orderid}})
        .then(value =>{
            let products = []
            value.forEach(orderdetail =>{
                products.push(Product.findOne({where: {id_product: orderdetail.ProductIdProduct}})
                                .then(async value =>{
                                    value.unit_stock = value.unit_stock + orderdetail.product_amount
                                    await value.save()
                }))
            })
            Promise.all(products)
            .then(value =>{
                res.send("Borrado")
            })
            .catch(error =>{
                next(erorr)
            })
        })
    }
}

module.exports = OrderCart