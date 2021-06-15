const { Tag, Category } = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const filtersCreator = (tag, category, rangePriceMin, rangePriceMax) => {
    var filters = {};

    filters.include = [
        {
            model: Tag,
        },
        {
            model: Category,
        },
    ];
    if(tag !== 'not passed') {
        filters.include[0].where = {
            name_tag: {
                [Op.or]: [
                    { [Op.like]: `%${tag}%` },   //Op.ilike ILIKE (case insensitive) (PG only)
                    { [Op.like]: `%${tag.toLowerCase()}%` },
                    { [Op.like]: `%${tag.toUpperCase()}%` },
                    { [Op.like]: `%${tag[0].toUpperCase() + tag.slice(1).toLowerCase()}%` }
                ]
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
    if(rangePriceMin !== 'not passed' && rangePriceMax !== 'not passed') {
        filters.where = {
            price: {
                [Op.and]: {
                    [Op.gte]: parseInt(rangePriceMin),  
                    [Op.lte]: parseInt(rangePriceMax)
                }
            }
        }
    }
    if(rangePriceMin !== 'not passed' && rangePriceMax === 'not passed') { 
        filters.where = {
            price: {
                [Op.gte]: parseInt(rangePriceMin)   
            }
        }
    }
    if(rangePriceMin === 'not passed' && rangePriceMax !== 'not passed') { 
        filters.where = {
            price: {
                [Op.lte]: parseInt(rangePriceMax)
            }
        }
    }

    return filters;
}

module.exports = filtersCreator;