const {firstInfoSearcher, secoundInfoSearcher} = require("./controllersUtils/userInfoSearcher");
const { User } = require('../db.js')

function getUserInfo (req,res,next) {
    let { username, email } = req.body;
    if(username){
        let sendUser = {};
        User.findOne({where:{username}})
        .then((userCreated)=>firstInfoSearcher(userCreated, sendUser))
        .then((response)=> secoundInfoSearcher(response, res, sendUser))
        .catch((e)=>next(e))
    };
    if(email){
        let sendUser = {};
        User.findOne({where:{email}})
        .then((userCreated)=>firstInfoSearcher(userCreated, sendUser))
        .then((response)=> secoundInfoSearcher(response, res, sendUser))
        .catch((e)=>next(e))
    }
}

//---------------------------------------------

function putUserInfo (req,res,next) {
    let {id, firstname, lastname, email, image, phone, username, identification, nacionality, documentType} = req.body;
    User.update({
        name: firstname,
        last_name: lastname,
        email,
        image,
        phone,
        username,
        identification,
    },
        {where:{id_user : id}}
    )
    .then(()=>User.findByPk(id))
    .then((userFound)=>{
        userFound.setDocumentType(documentType);
        userFound.setNacionality(nacionality);
        userFound.setUserStatus(2);
        res.sendStatus(200);
    })
    .catch((e)=>next(e))
}

module.exports ={
    getUserInfo,
    putUserInfo
}