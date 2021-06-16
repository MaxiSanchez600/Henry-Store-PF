const { Nacionality, DocumentType, Category, SubCategory } = require('../db.js')

function getNacionalities (req, res, next) {
    Nacionality.findAll()
    .then((response)=>{
        let nacionalities = response.map(country=>{
            let newNacionality = {
                id : country.id_nacionality,
                nacionality : country.name_nacionality
            }
            return newNacionality
        })
        res.send(nacionalities)
    })
    .catch((e)=>next(e))
};

function getDocumentTypes (req, res, next){
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

function getCategories (req, res, next) {
    Category.findAll({
        attributes: ['id_category', 'name_category'],
        include: [{
            model: SubCategory,
            attributes: ['id_sub_category', 'name_sub_category', 'description']
        }]
    })
    .then( response => {
        res.send(response);
    })
    .catch(e => next(e));
}

module.exports = {
    getDocumentTypes,
    getNacionalities,
    getCategories
}