const { DocumentType, User } = require('../../db.js')
const formatString = require ('../controllersUtils/formatString.js');
const { Op } = require("sequelize");

function createDocumentTypes (req, res, next){
    let { documenttype } = req.body;
    let formatDocumentType = formatString(documenttype);
    DocumentType.create({
        name_document_type: formatDocumentType
    })
    .then((newDocumentType)=>res.send(newDocumentType))
    .catch((e)=>next(e))
};

function readDocumentTypes (req, res, next){
    DocumentType.findAll()
    .then((response)=>{
        let types = response.map(type=>{
            let newType = {
                id : type.id_document_type,
                type : type.name_document_type
            }
            return newType
        })
        res.send(types)
    })
    .catch((e)=>next(e))
};

function updateDocumentTypes (req,res,next) {
    let {id, documenttype} = req.body;
    let formatDocumentType= formatString(documenttype)

    DocumentType.update({
        name_document_type: formatDocumentType
    },
    {
        where:{
            id_document_type: id
        }
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

function deleteDocumentTypes (req,res,next) {
    let {id} = req.body;
    let idDocumentTypeUndefined = null;
    
    DocumentType.findOne({
        where:{
            name_document_type: {[Op.iLike]: 'undefined'}
        }
    })
    .then((result)=>{
        idDocumentTypeUndefined = result.id_document_type;

        if(id === idDocumentTypeUndefined){
            return res.sendStatus(403);
        }
        return User.findAll({
            where:{
                DocumentTypeIdDocumentType: id
            }
        })
    })
    .then((usersWithDocumentType)=>{
        usersWithDocumentType.forEach(user=>{
            user.setDocumentType(idDocumentTypeUndefined);
        })
        return DocumentType.destroy({
            where:{
                id_document_type: id
            }
        })
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

module.exports = {
    createDocumentTypes,
    readDocumentTypes,
    updateDocumentTypes,
    deleteDocumentTypes
}