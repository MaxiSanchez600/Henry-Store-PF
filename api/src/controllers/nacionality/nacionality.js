const { Nacionality, User } = require('../../db.js')
const formatString = require ('../controllersUtils/formatString.js');
const { Op } = require("sequelize");

function createNacionalities (req, res, next){
    let { nacionality } = req.body;
    let formatNacionality = formatString(nacionality)
    Nacionality.create({
        name_nacionality: formatNacionality
    })
    .then((newNacionality)=>res.send(newNacionality))
    .catch((e)=>next(e))
};

function readNacionalities (req, res, next) {
    Nacionality.findAll({
        where:{
            name_nacionality:{[Op.notILike]: "undefined"}
        }
    })
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

function updateNacionalities (req,res,next) {
    let {id, nacionality} = req.body;
    let formatNacionality= formatString(nacionality)

    Nacionality.update({
        name_status: formatNacionality
    },
    {
        where:{
            id_nacionality: id
        }
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

function deleteNacionalities (req,res,next) {
    let {id} = req.body;
    let idNacionalityUndefined = null;
    
    Nacionality.findOne({
        where:{
            name_nacionality: {[Op.iLike]: 'undefined'}
        }
    })
    .then((result)=>{
        idNacionalityUndefined = result.id_nacionality;

        if(id === idNacionalityUndefined){
            return res.sendStatus(403);
        }
        return User.findAll({
            where:{
                NacionalityIdNacionality: id
            }
        })
    })
    .then((usersWithNacionality)=>{
        usersWithNacionality.forEach(user=>{
            user.setNacionality(idStatusUndefined);
        })
        return Nacionality.destroy({
            where:{
                id_nacionality: id
            }
        })
    })
    .then(()=>res.sendStatus(200))
    .catch(e=>next(e));
};

module.exports = {
    createNacionalities,
    readNacionalities,
    updateNacionalities,
    deleteNacionalities
}