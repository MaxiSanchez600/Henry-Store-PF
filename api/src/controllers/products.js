const { Product, Caracteristic, ProductCaracteristic } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const filtersCreator = require('./controllersUtils/products');

const productController = {
    getAll: async (req, res, next) => {
        
        try {
            const {
                tag = 'not passed',
                category = 'not passed',
                rangePriceMin = 'not passed',
                rangePriceMax = 'not passed',
                page = 1,
                orderType = 'id_product',
                orderDirection = 'ASC',
                ...caracteristics
            } = req.query;

            //seteo el limit y el offset, es decir, la pagina
            const perPage = 10;
            const current = (page * perPage) - perPage;

            //uso filtersCreator para filtrar por tags, categorias o rangos de precios en una primera estancia
            const products = await Product.findAll({
                ...filtersCreator(tag, category, rangePriceMin, rangePriceMax),
            });

            // guardo solo los id de la primera instancia de filtro
            let productsId = [];
            for(let i = 0; i <= products.length - 1; i++) {
                productsId.push(products[i].id_product)
            }
            // console.log(productsId);  

            // si tengo caracteristicas para filtrar entro acá
            if(Object.keys(caracteristics).length > 0) {
                //primero busco los id de las caracteristicas que me importan
                var caracteristicComplete = [];
                const caracteristicsSearch = await Caracteristic.findAll();
                for( let j = 0; j <= Object.keys(caracteristics).length - 1; j++) {
                    for(let k = 0; k <= caracteristicsSearch.length - 1; k++) {
                        if(Object.keys(caracteristics)[j] === caracteristicsSearch[k].name_caracteristic) {
                            caracteristicComplete.push({
                                id: caracteristicsSearch[k].id_caracteristic,
                                name: Object.keys(caracteristics)[j],
                                value: Object.values(caracteristics)[j]        
                            })
                        }
                    }
                }
                // console.log(caracteristicComplete);

                // hago un bucle de filtrado por cada una de las características, por cada vez que filtro guardo los id resultado en prodctsId
                // las filtraciones se detienen cuando ya no hay mas caracteristicas para filtrar o porque productsId quedó vació (no se encontró nada)
                for(let l = 0; l <= caracteristicComplete.length - 1; l++) {
                    if(productsId.length > 0) {
                        var productsFiltered = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: {
                                    [Op.or]: productsId
                                },
                                CaracteristicIdCaracteristic: caracteristicComplete[l].id,
                                value_caracteristic: caracteristicComplete[l].value
                            }
                        });
                        productsId = [];
                        for(let m = 0; m <= productsFiltered.length - 1; m++) {
                            productsId.push(productsFiltered[m].ProductIdProduct);
                        }
                    }
                    // console.log(productsId);
                }
            }

            //  luego de haber pasado por todos los filtrados, busco los id de productsId, con un ordenamiento y paginado, o si no devuelvo un array vacío
            if(productsId.length > 0) {
                const result = await Product.findAll({
                    where: {
                        id_product: {
                            [Op.or]: productsId
                        }
                    },
                    order: [[orderType, orderDirection]],
                    offset: current,
                    limit: perPage
                });
                return res.send(result);
            }
            return res.send([]);

        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;