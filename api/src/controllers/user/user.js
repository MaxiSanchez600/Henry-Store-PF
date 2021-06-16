let { User, Role, UserStatus } = require ('../../db.js')
const { Op } = require("sequelize");
const formatString = require ('../controllersUtils/formatString.js')

function getUsers (req,res,next) {
    User.findAndCountAll()
    .then(response=>res.send(response))
    .catch(e=>next(e))
};

function updateRolUser (req,res,next) {
    let { id, role} = req.body;

    let roleFound = Role.findOne({
        where:{
            rol: {[Op.iLike]: role}
        }
    });

    let userFound = User.findByPk(id);

    Promise.all([roleFound,userFound])
    .then((response)=>{
        response[1].setRole(response[0].id_rol)
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateStatusUser (req,res,next) {
    let { id, status} = req.body;

    let statusFound = UserStatus.findOne({
        where:{
            name_status: {[Op.iLike]: status}
        }
    });

    let userFound = User.findByPk(id);

    Promise.all([statusFound,userFound])
    .then((response)=>{
        response[1].setUserStatus(response[0].id_status)
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateStatusManyUsers (req,res,next) {
    let { idprevstatus, idnewstatus} = req.body;

    User.findAll({
        where:{
            UserStatusIdStatus: idprevstatus
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setUserStatus(idnewstatus)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

module.exports ={
    getUsers,
    updateRolUser,
    updateStatusUser,
    updateStatusManyUsers
};