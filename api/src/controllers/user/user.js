let { User, Role, UserStatus } = require ('../../db.js')
const { Op } = require("sequelize");

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

function updateRoleManyUsers (req,res,next) {
    let { idprevrole, idnewrole} = req.body;

    User.findAll({
        where:{
            RoleIdRol: idprevrole
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setRole(idnewrole)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateNacionalityManyUsers (req,res,next) {
    let { idprevnacionality, idnewnacionality} = req.body;

    User.findAll({
        where:{
            NacionalityIdNacionality: idprevnacionality
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setRole(idnewnacionality)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function updateDocumentTypeManyUsers (req,res,next) {
    let { idprevdoctype, idnewdoctype} = req.body;

    User.findAll({
        where:{
            DocumentTypeIdDocumentType: idprevdoctype
        }
    })
    .then((usersFound)=>{
        usersFound.forEach(user=>{
            user.setDocumentType(idnewdoctype)
        })
        res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function getHcAmount (req,res,next) {
  
};

module.exports ={
    updateRolUser,
    updateStatusUser,
    updateStatusManyUsers,
    updateRoleManyUsers,
    updateNacionalityManyUsers,
    updateDocumentTypeManyUsers,
    getHcAmount
};