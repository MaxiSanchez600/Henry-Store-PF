let { Role, User } = require ('../../db.js');
const formatString = require ('../controllersUtils/formatString.js');
const { Op } = require("sequelize");

function createRole (req,res,next) {
    let {role} = req.body;
    let formatRole = formatString(role)
    Role.create({
        rol: formatRole
    })
    .then((roleCreated)=>res.send(roleCreated))
    .catch(e=>next(e));
};

function readRole (req,res,next) {
    Role.findAll()
    .then((response)=>{
        let allRoles = response.map(role=>{
            let formatRole = {
                id: role.id_rol,
                type: role.rol
            };
            return formatRole;
        })
        res.send(allRoles);
    })
    .catch(e=>next(e));
};

function updateRole (req,res,next) {
    let {id, role} = req.body;
    let formatRole= formatString(role)
    Role.findAll({
        where:{
            rol: {[Op.or]: [
                {[Op.iLike]: 'user'},
                {[Op.iLike]: 'admin'},
                {[Op.iLike]: 'superadmin'},
            ]}
        }
    })
    .then((result)=>{
        let forbiddenRoles = result.map(role=>{
            return role.id_rol
        })
        if(forbiddenRoles.includes(id)){
            return res.sendStatus(403);
        }
        Role.update({
            rol: formatRole
        },
        {
            where:{
                id_rol: id
            }
        })
        return res.sendStatus(200)
    })
    .catch(e=>next(e));
};

function deleteRole (req,res,next) {
    let {id} = req.body;
    let idRoleUser = null;

    Role.findAll({
        where:{
            rol: {[Op.or]: [
                {[Op.iLike]: 'user'},
                {[Op.iLike]: 'admin'},
                {[Op.iLike]: 'superadmin'},
            ]}
        }
    })
    .then((result)=>{
        let forbiddenRoles = result.map(role=>{
            return role.id_rol
        })
        if(forbiddenRoles.includes(id)){
            return res.sendStatus(403);
        }

        let roleUser = result.find(role=>(role.rol === 'user' || role.rol === 'User'))
        idRoleUser = roleUser.id_rol

        return User.findAll({
            where:{
                RoleIdRol : id
            }
        })
    })
    .then((usersWithRole)=>{
        usersWithRole.forEach(user=>{
            user.setRole(idRoleUser);
        })
        return Role.destroy({
            where:{
                id_rol: id
            }
        })
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

module.exports ={
    createRole,
    readRole,
    updateRole,
    deleteRole
};