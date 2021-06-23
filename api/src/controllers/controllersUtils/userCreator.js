const { User, Role, UserStatus, DocumentType, Nacionality } = require('../../db.js');
const { Op } = require("sequelize");

function userCreator (res, next, id, username, email, firstname, lastname, image) {
    let userCreated = User.create({
        id_user: id,
        username,
        email,
        image,
        name: firstname,
        last_name: lastname,
        hc_amount: 0
    })
    let userRole = Role.findOne({
        where:{
            rol: {[Op.iLike]: 'user'},
        }
    });
    let userStatus = UserStatus.findOne({
        where:{
            name_status: {[Op.iLike]: 'incompleto'},
        }
    });
    let userDocumentType = DocumentType.findOne({
        where:{
            name_document_type: {[Op.iLike]: 'undefined'},
        }
    });
    let userNacionality = Nacionality.findOne({
        where:{
            name_nacionality: {[Op.iLike]: 'undefined'},
        }
    })
    Promise.all([userCreated,userRole,userStatus,userDocumentType,userNacionality])
    
    .then((response)=>{
        response[0].setRole(response[1].id_rol);
        response[0].setUserStatus(response[2].id_status);
        response[0].setDocumentType(response[3].id_document_type);
        response[0].setNacionality(response[4].id_nacionality);
        res.send(response[0])
    })
    .catch((e)=>next(e))
}

module.exports = userCreator