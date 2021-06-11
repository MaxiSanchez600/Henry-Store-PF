const userInfoSearcher = require("./controllersUtils/userInfoSearcher");
const { Users } = require('../db.js')

function getUserInfo (req,res,next) {
    let { username, email } = req.body;
    if(username){
        userInfoSearcher(res, next, username);
    };
    if(email){
        userInfoSearcher(res, next, null, email);
    }
}

function putUserInfo (req,res,next) {
    let {id, firstname, lastname, email, phone, username, identification, nacionality, documentType} = req.body;
    Users.update({
        name: firstname,
        last_name: lastname,
        email,
        phone,
        user_name: username,
        identification,
        nacionality,
        // documentTypeIdDocumentType: documentType
    },
        {where:{id_user : id}}
    )
    .then(()=>{
        res.send('listo chango')
    })
    .catch((e)=>next(e))
}

module.exports ={
    getUserInfo,
    putUserInfo
}