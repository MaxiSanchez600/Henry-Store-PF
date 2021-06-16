const { Role, UserStatus, DocumentType, Nacionality } = require('../../db.js')

function firstInfoSearcher (userFound,sendUser){
        sendUser.id = userFound.id_user;
        sendUser.name = userFound.name;
        sendUser.lastname = userFound.last_name;
        sendUser.email = userFound.email;
        sendUser.phone = userFound.phone;
        sendUser.username = userFound.username;
        sendUser.identification = userFound.identification;
        sendUser.image = userFound.image;

        let roleStr = Role.findByPk(userFound.RoleIdRol);
        let statusStr = UserStatus.findByPk(userFound.UserStatusIdStatus);
        let documentStr = DocumentType.findByPk(userFound.DocumentTypeIdDocumentType);
        let nacionalityStr = Nacionality.findByPk(userFound.NacionalityIdNacionality);
        return Promise.all([documentStr, roleStr, statusStr, nacionalityStr]);
    }

function secoundInfoSearcher (response, sendUser){
    sendUser.documentType = response[0].name_document_type; 
    sendUser.role = response[1].rol;
    sendUser.status = response[2].name_status;
    sendUser.nacionality = response[3].name_nacionality;
}

module.exports = {
    firstInfoSearcher,
    secoundInfoSearcher
}