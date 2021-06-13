const { Product, Category, Tag, Caracteristic, Image, ProductCaracteristic } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const filtersCreator = require('./controllersUtils/products');

const productController = {
    getAll: async (req, res, next) => {
        
        try {
            let {
                tag = 'not passed',
                category = 'not passed',
                rangePriceMin = 'not passed',
                rangePriceMax = 'not passed',
                page = 1,
                orderType = 'id_product',
                orderDirection = 'ASC',
                ...caracteristics
            } = req.query;

            //nos aseguramos que no haya problema con los rangos de precio
            if(rangePriceMax === '') {
                rangePriceMax = 'not passed';
            }
            if(rangePriceMin === '') {
                rangePriceMin = 'not passed';
            }

            //seteo el limit y el offset, es decir, la pagina
            const perPage = 100;
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
                var result = await Product.findAll({
                    where: {
                        id_product: {
                            [Op.or]: productsId
                        }
                    },
                    include: [
                        { model: Tag, attributes: ['id_tag', 'name_tag'], through: { attributes: [] } },
                        { model: Category, attributes: ['id_category', 'name_category'], through: { attributes: [] } },
                        { model: Caracteristic, attributes: ['id_caracteristic', 'name_caracteristic'], through: { attributes: ['value_caracteristic'] } },   
                        { model: Image, attributes: ['id_image', 'name_image']  }
                    ],
                    order: [[orderType, orderDirection]],
                    offset: current,
                    limit: perPage
                });
                
                // agregamos las caracteristicas sin usar el ORM
                var productsFinal = [];
                for(let n = 0; n <= result.length - 1; n++) {
                    //primero clonamos cada objeto producto y lo introducimos en nuestro arreglo final
                    productsFinal.push({
                        id_product: result[n].id_product,
                        name: result[n].name,
                        description: result[n].description,
                        unit_stock: result[n].unit_stock,
                        henry_coin: result[n].henry_coin,
                        weight: result[n].weight,
                        size: result[n].size,
                        percentage_discount: result[n].percentage_discount,
                        promotion: result[n].promotion,
                        Tags: result[n].Tags,
                        Categories: result[n].Categories,
                        Images: result[n].Images,
                        Caracteristics: []
                    });
                    for(let o = 0; o <= result[n].Caracteristics.length - 1; o++) {
                        // para cada caracteristica dentro de un producto, ingresamos su id y su name
                        productsFinal[n].Caracteristics.push({ id_caracteristic: result[n].Caracteristics[o].id_caracteristic, name_caracteristic: result[n].Caracteristics[o].name_caracteristic })
                        // hacemos una consulta a ProductCaracteristic para traernos todos los valores que coincidan
                        // simultaneamente con el id del producto y el id de la caracteristica
                        var allCaracteristicsProduct = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: result[n].id_product,
                                CaracteristicIdCaracteristic: result[n].Caracteristics[o].id_caracteristic
                            }
                        });
                        // recorremos el array de resultados con los valores para cada caracteristica de un producto
                        for(let p = 0; p <= allCaracteristicsProduct.length - 1; p++) {
                            //añadimos los valores de una determinadad caracteristica dentro del arreglo Caracteristics
                            if(p === 0) {
                                productsFinal[n].Caracteristics[o].values_caracteristic = [allCaracteristicsProduct[p].value_caracteristic];
                            } else {
                                productsFinal[n].Caracteristics[o].values_caracteristic.push(allCaracteristicsProduct[p].value_caracteristic);
                            }
                        }
                    }
                }

                return res.send(productsFinal);
            }
            return res.send([]);

        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;