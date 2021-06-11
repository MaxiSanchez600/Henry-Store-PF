const { Product } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const filtersCreator = (tag, category, rangePriceMin, rangePriceMax, caracteristics, orderType, orderDirection) => {
    var filters = {};
    // var includes = [];

    filters.include = [
        {
            model: Tags
        },
        {
            model: Categories,
        },
        {
            model: Caracteristics
        }
    ];
    if(tag !== 'not passed') {
        filters.include[0].where = {
            name_tag: {
                [Op.like]: `%${tag.toLowerCase()}%`
            }
        };
        filters.include[0].required = true;
    }
    if(category !== 'not passed') {
        filters.include[1].where = {
            name_category: category
        };
        filters.include[1].required = true;
    }
    if(rangePriceMin !== 'not passed' && rangePriceMax !== 'not passed') { // checkear si se necesita required: true acá
        filters.where = {
            price: {
                [Op.and]: {
                    [Op.gte]: parseInt(rangePriceMin),    //checkear si las props de Op estan bien, si no probar con Op.gt y Op.lt
                    [Op.lte]: parseInt(rangePriceMax)
                }
            }
        }
    }
    if(rangePriceMin !== 'not passed' && rangePriceMax === 'not passed') { // checkear si se necesita required: true acá
        filters.where = {
            price: {
                [Op.gte]: parseInt(rangePriceMin)   
            }
        }
    }
    if(rangePriceMin === 'not passed' && rangePriceMax !== 'not passed') { // checkear si se necesita required: true acá
        filters.where = {
            price: {
                [Op.lte]: parseInt(rangePriceMax)
            }
        }
    }
    // if(type !== 'not passed') { // comprobar si se necesita required: true acá
    //     filters.include[1].include[0].where = {
    //         name_sub_category: type
    //     };
    //     filters.include[1].include[0].required = true;
    // }
    if(Object.keys(caracteristics).length > 0) {    //algo asi seria esto, necesita mil chequeos, y si no traer todo y filtrar fuera de la db
        filters.include[2].where = {
            name_caracteristic: {
                [Op.or]: Object.keys(caracteristics)
            }
        };
        filters.include[2].through = {
            where: {
                value_caracteristic: {
                    [Op.or]: Object.values(caracteristics)
                } 
            }
        };
        // filters.include[2].required = true; --> ver si esto es necesario
    }
    if(orderType !== 'not passed') {
        filters.order = [[orderType, orderDirection]];
    }

    return filters;


    // if(name !== 'not passed' && category === 'not passed') {
    //     filters.include = [
    //         ...includes,    //podría quitarse ya que son los primeros e irian vacios
    //         {
    //             model: Tags,
    //             where: {
    //                 name_tag: {
    //                     [Op.like]: `%${name.toLowerCase()}%`
    //                 }
    //             },
    //             required: true
    //         }
    //     ];
    // }
    // if(name === 'not passed' && category !== 'not passed') {
    //     filters.include = [
    //         ...includes,    //podría quitarse ya que son los primeros e irian vacios
    //         {
    //             model: Categories,
    //             where: {
    //                 name_category: name
    //             },
    //             required: true
    //         }
    //     ];
    // }
    // if(size !== 'not passed') {
    //     filters.include = [
    //         ...includes,
    //         {
    //             model: Caracteristics
    //         }
    //     ]
    // }
}

    /**
    machete sobre hardcodeo:
    categories: 
    id_category     name_category
        1               'ropa'
        2               'accesorios'
        3               'otros'

    --> completar
    */

const productController = {
    getAll: async (req, res, next) => {
        /*
        lo que me llega desde el front:
        CASO 1:
        req.query = {
            tag: 'henry' ---> busqueda por tags (el tag se compone de la categoria, colores, (sexo) y la desestructuracion del name)
            category: undefined --> budqueda por categoría
            rangePriceMin: '10', --> filtrado en producto
            rangePriceMax: '50', --> filtrado en producto
            type: 'buso' --> filtrado por subcategoria
            page: 1 --> paginacion del back
            orderType: undefined,
            orderDirection: undefined
            color: 'negro', --> filtrado en caracteristica ||caracteristicName1 = caracteristicValue1
            size: 's', --> filtrado en caracteristica ||caracteristicName2 = caracteristicValue2
            sex: undefined, --> filtrado en caracteristica ||caracteristicName3 = caracteristicValue3

        }

        CASO 2:
        req.query = {
            tag: undefined ---> busqueda por tags
            category: ropa --> budqueda por categoría
            rangePriceMin: undefined, --> filtrado en producto
            rangePriceMax: 50, --> filtrado en producto
            type: undefined --> filtrado por subcategoria
            page: 1 --> paginacion del back
            orderType: 'price',
            orderDirection: undefined
            sex: unisex, --> filtrado en caracteristica || caracteristicName1 = caracteristicValue1
        }
        */
        try {
            const {
                tag = 'not passed',
                category = ' not passed',
                rangePriceMin = 'not passed',
                rangePriceMax = 'not passed',
                // type = 'not passed',
                page = 1,
                orderType = 'not passed',
                orderDirection = 'ASC',
                ...caracteristics
            } = req.query;

            //seteo el limit y el offset, es decir, la pagina
            const perPage = 10;
            const current = (page * perPage) - perPage;

            //si por query no me llega nada devuelvo la pagina 1 del catalogo completo ordenado alfabitamente por nombre
            const products = await Product.findAll({
                ...filtersCreator(tag, category, rangePriceMin, rangePriceMax, caracteristics, orderType, orderDirection),
                // order: [[orderType, orderDirection]],
                offset: current,
                limit: perPage
            });

            // el objeto que quiero devolver:
            /**
            res = {
                products: [
                    {
                        "id": 1,
                        "name": "Buso Henry",
                        "price": 109.95,
                        "description": "Buzo elaborado en algodón perchado, de suave textura, estilo moderno , amplio bolsillo delantero, con estampado de Henry",
                        "image": "https://ibb.co/jbLWf1t",
                        "unit_stock": 12,
                        "henry_coin": 10,
                        "weight": 100,
                        "size": 2,
                        "promotion":false,
                        "categories": [{id_category: 1, category_ name: 'ropa'}],
                        
                    }
                ]
            }
            */



        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;