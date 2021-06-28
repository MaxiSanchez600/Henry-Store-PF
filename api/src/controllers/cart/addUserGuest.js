const {Order, OrderDetail, OrderDetailCaracteristic, User, Role, Nacionality, DocumentType, UserStatus} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const addUserGuest = {
    addGuest: async (req, res) =>{
         const amount = await User.count() + ""
         const userguest = await User.create({id_user: amount})
         const role = await Role.findOne({where: {rol: 'guest'}})
         const nacionality = await Nacionality.findOne({where: {name_nacionality: 'Undefined'}})
         const document = await DocumentType.findOne({where: {name_document_type: "Undefined"}})
         const status = await UserStatus.findOne({where: {name_status: "Incompleto"}})
         await userguest.setRole(role.dataValues.id_rol)
         await userguest.setNacionality(nacionality.dataValues.id_nacionality)
         await userguest.setDocumentType(document.dataValues.id_document_type)
         await userguest.setUserStatus(status.dataValues.id_status)
         res.json({userid: userguest.dataValues.id_user})
    }
}

module.exports = addUserGuest