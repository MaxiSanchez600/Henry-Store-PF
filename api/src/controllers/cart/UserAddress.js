const {Order, OrderDetail, OrderDetailCaracteristic, User, Nacionality, UserAddress} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const UserAddressRoutes = {
    AddUserAddress: async (req, res, next) =>{
        let AddressCreated;
        const {userid, pais, province, localidad, direccion, numerodireccion, postal_code, phone_contact, description} = req.body
        UserAddress.create({province: province, localidad: localidad, direccion: direccion, numerodireccion: numerodireccion, postal_code: postal_code, phone_contact: phone_contact, description: description})
        .then(Address =>{
            AddressCreated = Address;
            return Nacionality.findOne({where: {id_nacionality: pais}})
        })
        .then(Nacion => {
            AddressCreated.setNacionality(Nacion)
            return User.findOne({where: {id_user: userid}})
        })
        .then(user =>{
            AddressCreated.setUser(user)
            res.send("Todo seteado")
        })
        .catch(error =>{
            next(error)
        })
    },

    GetUserAddress:  (req, res, next) =>{
        const {userid} = req.query;
        UserAddress.findAll({where: {UserIdUser: userid}})
        .then(value =>{
            res.send(value)
        })
        .catch(error =>{
            next(error)
        })
    }
}

module.exports = UserAddressRoutes