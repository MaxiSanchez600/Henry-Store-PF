const { UserStatus, User } = require ('../../db.js');
const formatString = require ('../controllersUtils/formatString.js');
const { Op } = require("sequelize");

function createUserStatus (req,res,next) {
    let {status} = req.body;
    let formatStatus = formatString(status)
    UserStatus.create({
        name_status: formatStatus
    })
    .then((statusCreated)=>res.send(statusCreated))
    .catch(e=>next(e));
};

function readUserStatus (req,res,next) {
    UserStatus.findAll()
    .then((response)=>{
        let allStatus = response.map(status=>{
            let formatStatus = {
                id: status.id_status,
                type: status.name_status
            };
            return formatStatus;
        })
        res.send(allStatus);
    })
    .catch(e=>next(e));
};

function updateUserStatus (req,res,next) {
    let {id, status} = req.body;
    let formatStatus= formatString(status)

    UserStatus.findAll({
        where:{
            name_status: {[Op.or]: [
                {[Op.iLike]: 'incompleto'},
                {[Op.iLike]: 'completo'},
                {[Op.iLike]: 'baneado'},
                {[Op.iLike]: 'deshabilitado'},
                {[Op.iLike]: 'undefined'},
            ]}
        }
    })
    .then(response=>{
        let forbiddenStatus = response.map(status=>{
            return status.id_status
        })
        if(forbiddenStatus.includes(id)){
            return res.sendStatus(403);
        }
        UserStatus.update({
            name_status: formatStatus
        },
        {
            where:{
                id_status: id
            }
        })
        return res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function deleteUserStatus (req,res,next) {
    let {id} = req.body;
    let idStatusUndefined = null;
    UserStatus.findAll({
        where:{
            name_status: {[Op.or]: [
                {[Op.iLike]: 'incompleto'},
                {[Op.iLike]: 'completo'},
                {[Op.iLike]: 'baneado'},
                {[Op.iLike]: 'deshabilitado'},
                {[Op.iLike]: 'undefined'},
            ]}
        }
    })
    .then((result)=>{
        let statusUndefined = result.find(e=>(e.name_status === 'undefined'||e.name_status === 'Undefined'))
        idStatusUndefined = statusUndefined.id_status
        let forbiddenStatus = result.map(status=>{
            return status.id_status
        })
        if(forbiddenStatus.includes(id)){
            return res.sendStatus(403);
        }
        return User.findAll({
            where:{
                UserStatusIdStatus: id
            }
        })
    })
    .then((usersWithStatus)=>{
        usersWithStatus.forEach(user=>{
            user.setUserStatus(idStatusUndefined);
        })
        return UserStatus.destroy({
            where:{
                id_status: id
            }
        })
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

module.exports ={
    createUserStatus,
    readUserStatus,
    updateUserStatus,
    deleteUserStatus
};