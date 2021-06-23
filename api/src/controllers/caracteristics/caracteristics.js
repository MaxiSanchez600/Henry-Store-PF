const { Product, ProductCaracteristic, Caracteristic } = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const filtersCreator = require('../controllersUtils/products');

const caracteristicsController = {
    getCaracteristics: async (req, res, next) => {
        try {
            //recibo queries de filtrado y obtengo los productos que matcheen, luego guardo sus id
            const {
                tag = 'not passed',
                category = 'not passed'
            } = req.query;
            let products = await Product.findAll({...filtersCreator(tag, category, 'not passed', 'not passed', 'not passed')});
            if(products.length === 0 ) return res.send({ data:[] });
            let productsId = products.map(product => {
                return product.id_product;
            });
    
            //consulto todos los valores existentes para esos id
            //tambien guardo los id de las caracteristicas a las que pertencen
            let productCaracteristics = await ProductCaracteristic.findAll({
                where: {
                    ProductIdProduct: {
                        [Op.or]: productsId
                    }
                },
                attributes: ['value_caracteristic', 'ProductIdProduct', 'CaracteristicIdCaracteristic'],
                order: [['ProductIdProduct', 'ASC']]
            });
            if(productCaracteristics.length === 0) return res.send({ data:[] });
            let caracteristicsId = [];
            for(let i = 0; i <= productCaracteristics.length - 1; i++) {
                if(!caracteristicsId.includes(productCaracteristics[i].CaracteristicIdCaracteristic)) {
                    caracteristicsId.push(productCaracteristics[i].CaracteristicIdCaracteristic)
                }
            }
    
            //consulto cuales son las caracteristicas que coinciden con los id obtenidos
            let caracteristics = await Caracteristic.findAll({
                where: {
                    id_caracteristic: {
                        [Op.or]: caracteristicsId
                    }
                },
                attributes: ['id_caracteristic', 'name_caracteristic']
            });
    
            //armo mi objeto data agrupando cada caracteristica que haya aparecido en toda la busqueda
            //con todos los valores que hayan aparecido para esta
            let data = [];
            for(let j = 0; j <= caracteristics.length - 1; j++) {
                data.push({
                    id_caracteristic: caracteristics[j].id_caracteristic, 
                    name_caracteristic: caracteristics[j].name_caracteristic,
                    values_caracteristic: []
                });
                for(let k = 0; k <= productCaracteristics.length - 1; k++) {
                    if(productCaracteristics[k].CaracteristicIdCaracteristic === data[j].id_caracteristic
                        && !data[j].values_caracteristic.includes(productCaracteristics[k].value_caracteristic)) {
                            data[j].values_caracteristic.push(productCaracteristics[k].value_caracteristic);
                        }
                }
            }
    
            return res.send({ data, queries: req.query });
        } catch (e) {
            return next(e);
        }
    }
};

module.exports = caracteristicsController;