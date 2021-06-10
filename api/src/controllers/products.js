const { Product } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const filtersCreator = (name, category, size, priceRange, color, sex, type) => {
    var filters = {};
    if(name !== 'not passed' && category === 'not passed') {
        filters.include = [{
            model: Tags,
            where: {
                name_tag: {
                    [Op.like]: `%${name.toLowerCase()}%`
                }
            },
            required: true
        }];
    }
    if(name === 'not passed' && category !== 'not passed') {
        filters.include = [{
            model: Categories,
            where: {
                name_category: name
            },
            required: true
        }];
    }
}

const productController = {
    getAll: async (req, res, next) => {
        /*
        lo que me llega desde el front:
        CASO 1:
        req.query = {
            name: 'henry' ---> busqueda por tags (el tag se compone de la categoria, colores, (sexo) y la desestructuracion del name)
            category: undefined --> budqueda por categoría
            size: 's', --> filtrado en caracteristica
            priceRange: '10-50', --> filtrado en producto
            color: 'negro', --> filtrado en caracteristica
            sex: undefined, --> filtrado en caracteristica
            type: 'buso' --> filtrado por subcategoria
            backPage: 1 --> paginacion del back
            orderType: undefined,
            orderDirection: undefined

        }

        CASO 2:
        req.query = {
            name: undefined ---> busqueda por tags
            category: ropa --> budqueda por categoría
            size: undefined, --> filtrado en caracteristica
            priceRange: undefined, --> filtrado en producto
            color: undefined, --> filtrado en caracteristica
            sex: male, --> filtrado en caracteristica
            type: undefined --> filtrado por subcategoria
            backPage: 1 --> paginacion del back
            orderType: 'price',
            orderDirection: undefined
        }
        */
        try {
            const {
                name = 'not passed',
                category = ' not passed',
                size = 'not passed',
                priceRange = 'not passed',
                color = 'not passed', 
                sex = 'not passed', 
                type = 'not passed',
                backPage = 1,
                orderType = 'name',
                orderDirection = 'ASC'
            } = req.query;

            //seteo el limit y el offset, es decir, la pagina
            const perPage = 10;
            const current = (backPage * perPage) - perPage;

            //si por query no me llega nada devuelvo la pagina 1 del catalogo completo ordenado alfabitamente por nombre
            const products = await Product.findAll({
                ...filtersCreator(name, category, size, priceRange, color, sex, type),
                order: [[orderType, orderDirection]],
                offset: current,
                limit: perPage
            });
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = productController;