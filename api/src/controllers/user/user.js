let { User, Role, UserStatus, Order, OrderDetail, OrderDetailCaracteristic, Product, Image, Caracteristic } = require ('../../db.js')
const { Op } = require("sequelize");

function updateRolUser (req,res,next) {
    let { id, role} = req.body;

    let roleFound = Role.findOne({
        where:{
            rol: {[Op.iLike]: role}
        }
    });

    let userFound = User.findByPk(id);

    Promise.all([roleFound,userFound])
    .then((response)=>{
        response[1].setRole(response[0].id_rol)
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateStatusUser (req,res,next) {
    let { id, status} = req.body;

    let statusFound = UserStatus.findOne({
        where:{
            name_status: {[Op.iLike]: status}
        }
    });

    let userFound = User.findByPk(id);

    Promise.all([statusFound,userFound])
    .then((response)=>{
        response[1].setUserStatus(response[0].id_status)
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateStatusManyUsers (req,res,next) {
    let { idprevstatus, idnewstatus} = req.body;

    User.findAll({
        where:{
            UserStatusIdStatus: idprevstatus
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setUserStatus(idnewstatus)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateRoleManyUsers (req,res,next) {
    let { idprevrole, idnewrole} = req.body;

    User.findAll({
        where:{
            RoleIdRol: idprevrole
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setRole(idnewrole)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateNacionalityManyUsers (req,res,next) {
    let { idprevnacionality, idnewnacionality} = req.body;

    User.findAll({
        where:{
            NacionalityIdNacionality: idprevnacionality
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setRole(idnewnacionality)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateDocumentTypeManyUsers (req,res,next) {
    let { idprevdoctype, idnewdoctype} = req.body;

    User.findAll({
        where:{
            DocumentTypeIdDocumentType: idprevdoctype
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setDocumentType(idnewdoctype)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function getHcAmount (req,res,next) {
  
};

function getUserOrders (req, res, next) {
    
    const { id } = req.query;

    Order.findAll({
        where: {
            UserIdUser: id
        },
        order: [['updatedAt', 'DESC']]
    })
    .then(response => {
        return res.send(response);
    })
    .catch(error => {
        next(error);
    });

};

async function getOrderAndProductDetails (req, res, next) {
    try {
        const { idUrl } = req.query;
    
        //busco la orden requerida por id
        const order = await Order.findByPk(idUrl);
    
        //empiezo a armar el objeto que voy a devolver
        let result = {
            id_order: order.id_order,
            status: order.status,
            totalprice: order.totalprice,
            spenthc: order.spenthc,
            givenhc: order.givenhc,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            UserIdUser: order.UserIdUser,
            products: []
        };
    
        //busco el detalle de orden que coincida con el id de la orden
        const orderDetails = await OrderDetail.findAll({
            where: {
                OrderIdOrder: result.id_order
            }
        });
    
        //busco todos los productos que aparecen en ese detalle de orden
        const productsMapped = orderDetails.map(orderDetail => {
            return Product.findByPk(orderDetail.ProductIdProduct);
        });
        const products = await Promise.all(productsMapped);
    
        //por cada producto encontrado extraigo los datos necesarios e incluyo las propiedades Images y Caracteristics,
        //al final incorporo el resultado en el objeto que voy a devolver
        for(let i = 0; i < products.length; i++) {
            let productObj = {
                id_product: products[i].id_product,
                name: products[i].name,
                description: products[i].description,
                price: products[i].price,
                unit_stock: products[i].unit_stock,
                henry_coin: products[i].henry_coin,
                percentage_discount: products[i].percentage_discount,
                product_amount: orderDetails[i].product_amount,
                Images: [],
                Caracteristics: []
            };
    
            //por cada producto busco las imagenes que le corresponden y las pusheo dentro de Images
            const productImages = await Image.findAll({
                where: {
                    ProductIdProduct: products[i].id_product
                }
            });
            for(let j = 0; j < productImages.length; j++) {
                productObj.Images.push(productImages[j]);
            }
    
            //por cada producto busco las caracteristicas del detalle de orden
            const productCaracteristics = await OrderDetailCaracteristic.findAll({
                where: {
                    OrderDetailIdOrderDetail: orderDetails[i].id_order_detail
                }
            })
            //en cada caracteristica encontrada del producto busco el nombre en la tabla Caracteristic y
            //pusheo dentro de la propiedad Caracteristics del producto el id, nombre y valor
            for(let k = 0; k < productCaracteristics.length; k++) {
                const caracteristic = await Caracteristic.findOne({
                    where: {
                        id_caracteristic: productCaracteristics[k].caracteristic_id
                    }
                });
                const caracteristicObj = {
                    id_caracteristic: productCaracteristics[k].caracteristic_id,
                    name_caracteristic: caracteristic.name_caracteristic,
                    values_caracteristic: [productCaracteristics[k].value_caracteristic]
                };
                productObj.Caracteristics.push(caracteristicObj);
            }
    
            result.products.push(productObj);
        }
    
        return res.send(result);
        
    } catch (error) {
        return next(error);
    }
};

module.exports ={
    updateRolUser,
    updateStatusUser,
    updateStatusManyUsers,
    updateRoleManyUsers,
    updateNacionalityManyUsers,
    updateDocumentTypeManyUsers,
    getHcAmount,
    getUserOrders,
    getOrderAndProductDetails
};