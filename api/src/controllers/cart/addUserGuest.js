const {Order, OrderDetail, OrderDetailCaracteristic, User, Role} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const addUserGuest = {
    addGuest: async (req, res) =>{
         const userguest = await User.create()
         const role = await Role.findOne({where: {rol: 'guest'}})
         await userguest.setRole(role.dataValues.id_rol)
         res.json({userid: userguest.dataValues.id_user})
    }
}

module.exports = addUserGuest