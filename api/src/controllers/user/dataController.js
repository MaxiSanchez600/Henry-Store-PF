const { Nacionality, DocumentType } = require('../../db.js')

function postNacionalities (req, res, next){
    let { id, nacionality } = req.body;

    Nacionality.create({
        id_nacionality: id,
        name_nacionality: nacionality
    })
    .then((newNacionality)=>{
        res.send(newNacionality)
    })
    .catch((e)=>next(e))
};

function postDocumentTypes (req, res, next){
    let { id, type } = req.body;

    DocumentType.create({
        id_document_type: id,
        name_document_type: type
    })
    .then((newDocType)=>{
        res.send(newDocType)
    })
    .catch((e)=>next(e))
};

module.exports = {
    postDocumentTypes,
    postNacionalities
}