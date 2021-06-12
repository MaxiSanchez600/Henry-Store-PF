const { Users, Role, UserStatus, DocumentType } = require('../../db.js')
const { Op } = require("sequelize")

function userInfoSearcher (res, next, username, email) {
    let sendUser = {};

    Users.findOne({where:{[Op.or]:[{email:email},{user_name:username}]}}) //revisar
    .then((userFinded)=>{
        sendUser.id = userFinded.id_user;
        sendUser.name = userFinded.name;
        sendUser.lastname = userFinded.last_name;
        sendUser.email = userFinded.email;
        sendUser.phone = userFinded.phone;
        sendUser.username = userFinded.user_name;
        sendUser.identification = userFinded.identification;
        sendUser.nacionality = userFinded.nacionality;

        let documentStr = DocumentType.findByPk(userFinded.documentTypeIdDocumentType);
        let roleStr = Role.findByPk(userFinded.roleIdRol);
        let statusStr = UserStatus.findByPk(userFinded.userStatusIdStatus);
        return Promise.all([documentStr, roleStr, statusStr]);
    })
    .then((response)=>{
        // sendUser.documentType = response[0].name_document_type; 
        sendUser.role = response[1].rol;
        sendUser.status = response[2].name_status;
        res.send(sendUser)
        sendUser = {}; //reset
    })
    .catch((e)=>next(e))
    }

module.exports = userInfoSearcher