const {firstInfoSearcher, secoundInfoSearcher} = require("./controllersUtils/userInfoSearcher");
const { User } = require('../db.js');

function getUserInfo (req,res,next) {
    let { username, email } = req.body;
    if(username){
        let sendUser = {};
        User.findOne({where:{username}})
        .then((userFound)=> firstInfoSearcher(userFound, sendUser))
        .then((response)=> secoundInfoSearcher(response, res, sendUser))
        .catch((e)=>next(e))
    };
    if(email){
        let sendUser = {};
        User.findOne({where:{email}})
        .then((userFound)=>firstInfoSearcher(userFound, sendUser))
        .then((response)=> secoundInfoSearcher(response, res, sendUser))
        .catch((e)=>next(e))
    }
}

//---------------------------------------------

function putUserInfo (req,res,next) {
    let {id, firstname, lastname, email, image, phone, username, identification, nacionality, documentType} = req.body;
    User.findByPk(id)
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
        return userFound.save()
    })
    .then(async(response)=>{
        let userToChangeStatus = {}
        if(!Object.values(response.dataValues).includes(null)){
            userToChangeStatus= await User.findByPk(id)
            userToChangeStatus.setUserStatus(2)
         }
         res.send(userToChangeStatus)
    })
    .catch(e=>next(e))
    
}

module.exports ={
    getUserInfo,
    putUserInfo
}