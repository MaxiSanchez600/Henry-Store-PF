const { Tag, Category } = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const filtersCreator = (tag, category, rangePriceMin, rangePriceMax, id, currency) => {
    var filters = {};

    filters.include = [
        {
            model: Tag,
        },
        {
            model: Category,
        },
    ];
    if(id !== 'not passed') {
        filters.where = {
            id_product: id
        }
    }
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
    // console.log("localStorage.getItem('currency'): ", localStorage.getItem("currency"));
    const convertedMinPrice = rangePriceMin !== "not passed" && currency ? parseInt(rangePriceMin) / parseInt(currency) : "";
    const convertedMaxPrice = rangePriceMax !== "not passed" && currency ? parseInt(rangePriceMax) / parseInt(currency) : "";
    if(rangePriceMin !== 'not passed' && rangePriceMax !== 'not passed') {
        filters.where = {
            price: {
                [Op.and]: {
                    // [Op.gte]: parseInt(rangePriceMin),  
                    // [Op.lte]: parseInt(rangePriceMax)
                    [Op.gte]: convertedMinPrice,
                    [Op.lte]: convertedMaxPrice
                }
            }
        }
    }
    if(rangePriceMin !== 'not passed' && rangePriceMax === 'not passed') { 
        filters.where = {
            price: {
                // [Op.gte]: parseInt(rangePriceMin)   
                [Op.gte]: convertedMinPrice
            }
        }
    }
    if(rangePriceMin === 'not passed' && rangePriceMax !== 'not passed') { 
        filters.where = {
            price: {
                // [Op.lte]: parseInt(rangePriceMax)
                [Op.lte]: convertedMaxPrice
            }
        }
    }

    return filters;
}

module.exports = filtersCreator;