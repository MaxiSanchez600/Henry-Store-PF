const { Role, UserStatus, DocumentType, Nacionality } = require('../../db.js')

function firstInfoSearcher (userFinded,sendUser){
        let documentStr = '';
        let nacionalityStr = '';

        sendUser.id = userFinded.id_user;
        sendUser.name = userFinded.name;
        sendUser.lastname = userFinded.last_name;
        sendUser.email = userFinded.email;
        sendUser.phone = userFinded.phone;
        sendUser.username = userFinded.username;
        sendUser.identification = userFinded.identification;
        sendUser.image = userFinded.image;

        let roleStr = Role.findByPk(userFinded.RoleIdRol);
        let statusStr = UserStatus.findByPk(userFinded.UserStatusIdStatus);
        userFinded.DocumentTypeIdDocumentType ? documentStr = DocumentType.findByPk(userFinded.DocumentTypeIdDocumentType) : null;
        userFinded.NacionalityIdNacionality ? nacionalityStr = Nacionality.findByPk(userFinded.NacionalityIdNacionality) : null;
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