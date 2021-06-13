const { Role, UserStatus, DocumentType, Nacionality } = require('../../db.js')

function firstInfoSearcher (userFound,sendUser){
        let documentStr = '';
        let nacionalityStr = '';

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
        userFound.DocumentTypeIdDocumentType ? documentStr = DocumentType.findByPk(userFound.DocumentTypeIdDocumentType) : null;
        userFound.NacionalityIdNacionality ? nacionalityStr = Nacionality.findByPk(userFound.NacionalityIdNacionality) : null;
        return Promise.all([documentStr, roleStr, statusStr, nacionalityStr]);
    }

function secoundInfoSearcher (response,res,sendUser){
    sendUser.documentType = response[0].name_document_type; 
    sendUser.role = response[1].rol;
    sendUser.status = response[2].name_status;
    sendUser.nacionality = response[3].name_nacionality;
    
    res.send(sendUser)
    sendUser = {}; //reset
}

module.exports = {
    firstInfoSearcher,
    secoundInfoSearcher
}