const {CurrencyChange} = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;



const getCurrencyFromDB = {
    getCurrency: async (req, res, next) =>{
        CurrencyChange.findAll().then(value =>{
            res.send(value)
        })
        .catch(error =>{
            next(error)
        })
    }
}

module.exports = getCurrencyFromDB