const {Order, OrderDetail, OrderDetailCaracteristic, User} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;

const putGuestCartinUser = {
    putCart: async (req, res) =>{
        const {new_user, guest_user} = req.body
        const guestcart = await Order.findOne({where: {UserIdUser: guest_user}})
        guestcart.UserIdUser = new_user
        await guestcart.save()
        await User.destroy({where: {id_user: guest_user}})
        res.send('carrito cambiado')
    }
}

module.exports = putGuestCartinUser