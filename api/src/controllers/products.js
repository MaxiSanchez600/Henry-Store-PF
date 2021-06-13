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
                        { model: Image } // attributes: ['id_image', 'url_image'], through: { attributes: [] }
                    ],
                    order: [[orderType, orderDirection]],
                    offset: current,
                    limit: perPage
                });
                
                for(let n = 0; n <= result.length - 1; n++) {
                    for(let o = 0; o <= result[n].Caracteristics.length - 1; o++) {
                        var allCaracteristicsProduct = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: result[n].id_product,
                                CaracteristicIdCaracteristic: result[n].Caracteristics[o].id_caracteristic
                            }
                        });
                        for(let p = 0; p <= allCaracteristicsProduct.length - 1; p++) {
                            if(p === 0) {
                                result[n].Caracteristics[o].values_caracteristic = [allCaracteristicsProduct[p].value_caracteristic];
                            } else {
                                result[n].Caracteristics[o].values_caracteristic.push(allCaracteristicsProduct[p].value_caracteristic);
                            }
                        }
                    }
                }
                // res.send(result[0].Caracteristics[0].values_caracteristic);

                // const palantir = await ProductCaracteristic.findAll();
                // // console.log(palantir);

                return res.send(result);
            }
            return res.send([]);

        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;

/**
[
  {
    "idProductCaracteristic": 1,
    "value_caracteristic": "L",
    "createdAt": "2021-06-11T15:08:14.000Z",
    "updatedAt": "2021-06-11T15:08:15.000Z",
    "ProductIdProduct": 1,
    "CaracteristicIdCaracteristic": 2
  },
  {
    "idProductCaracteristic": 4,
    "value_caracteristic": "M",
    "createdAt": "2021-06-11T15:08:32.000Z",
    "updatedAt": "2021-06-11T15:08:32.000Z",
    "ProductIdProduct": 1,
    "CaracteristicIdCaracteristic": 2
  },
  {
    "idProductCaracteristic": 7,
    "value_caracteristic": "Rojo",
    "createdAt": "2021-06-11T15:08:54.000Z",
    "updatedAt": "2021-06-11T15:08:55.000Z",
    "ProductIdProduct": 1,
    "CaracteristicIdCaracteristic": 1
  },
  {
    "idProductCaracteristic": 11,
    "value_caracteristic": "Unisex",
    "createdAt": "2021-06-11T15:09:24.000Z",
    "updatedAt": "2021-06-11T15:09:25.000Z",
    "ProductIdProduct": 1,
    "CaracteristicIdCaracteristic": 3
  },
  {
    "idProductCaracteristic": 17,
    "value_caracteristic": "3",
    "createdAt": "2021-06-11T15:17:25.000Z",
    "updatedAt": "2021-06-11T15:17:26.000Z",
    "ProductIdProduct": 1,
    "CaracteristicIdCaracteristic": 4
  },
  {
    "idProductCaracteristic": 23,
    "value_caracteristic": "Blanco",
    "createdAt": "2021-06-11T15:25:13.000Z",
    "updatedAt": "2021-06-11T15:25:14.000Z",
    "ProductIdProduct": 3,
    "CaracteristicIdCaracteristic": 1
  },
  {
    "idProductCaracteristic": 30,
    "value_caracteristic": "Negro",
    "createdAt": "2021-06-11T15:25:26.000Z",
    "updatedAt": "2021-06-11T15:25:27.000Z",
    "ProductIdProduct": 3,
    "CaracteristicIdCaracteristic": 1
  },
  {
    "idProductCaracteristic": 38,
    "value_caracteristic": "5",
    "createdAt": "2021-06-11T15:26:29.000Z",
    "updatedAt": "2021-06-11T15:26:29.000Z",
    "ProductIdProduct": 3,
    "CaracteristicIdCaracteristic": 4
  }
]
*/

/**
for(let n = 0; n <= result.length - 1; n++) {
                    for(let o = 0; o <= result[n].Caracteristics.length - 1; o++) {
                        var allCaracteristicsProduct = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: result[n].id_product,
                                CaracteristicIdCaracteristic: result[n].Caracteristics[o].id_caracteristic
                            }
                        });
                        for(let p = 0; p <= allCaracteristicsProduct.length - 1; p++) {
                            if(p === 0) {
                                result[n].Caracteristics[o].values_caracteristic = [allCaracteristicsProduct[p].value_caracteristic];
                            } else {
                                result[n].Caracteristics[o].values_caracteristic.push(allCaracteristicsProduct[p].value_caracteristic);
                            }
                        }
                        // res.send(result[n].Caracteristics[o].values_caracteristic);
                    }
                }
*/