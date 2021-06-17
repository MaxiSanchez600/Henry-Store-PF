const {firstInfoSearcher, secoundInfoSearcher} = require("../controllersUtils/userInfoSearcher");
const { User, UserStatus } = require('../../db.js');

function readUserInfo (req,res,next) {
    let {id} = req.query.id;
    let sendUser = {};
    
    User.findOne({where:{id_user: id}})
    .then((userFound)=> firstInfoSearcher(userFound, sendUser))
    .then((response)=> secoundInfoSearcher(response, sendUser, res))
    .catch((e)=>next(e))
}

//---------------------------------------------

function updateUserInfo (req,res,next) {
    let {id, firstname, lastname, email, image, phone, username, identification, nacionality, documentType} = req.body;
    let idparsed = Number(id)
    User.findByPk(idparsed)
    .then((userFound)=>{
        if(firstname){
            userFound.name = firstname;
        };
        if(lastname){
            userFound.last_name = lastname;
        };
        if(email){
            userFound.email = email;
        };
        if(image){
            userFound.image = image;
        };
        if(phone){
            userFound.phone = phone;
        };
        if(username){
            userFound.username = username;
        };
        if(identification){
            userFound.identification = identification;
        };
        if(nacionality){
            userFound.setNacionality(nacionality)
        };
        if(documentType){
            userFound.setDocumentType(documentType);
        };
        let statusComplete = UserStatus.findOne({
            where:{
                name_status: {[Op.iLike]: 'complet%'}
            }
        })
        return Promise.all([userFound.save(),statusComplete])
    })
    .then(async(response)=>{
        let userToChangeStatus = {}
        if(!Object.values(response[0].dataValues).includes(null)){
            userToChangeStatus= await User.findByPk(idparsed)
            userToChangeStatus.setUserStatus(response[1].id_status) 
         }
         res.send(userToChangeStatus)
    })
    .catch(e=>next(e))
    
}

module.exports ={
    readUserInfo,
    updateUserInfo
}