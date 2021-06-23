const adminapp = require ('../../utils/config/firebaseAdmin.js');
const { User, Role, DocumentType, Nacionality, UserStatus } = require ('../../db.js');

function readUsers (req,res,next) {

    const listAllUsers = (nextPageToken) => {
            let usersDB = User.findAll({
                attributes:{exclude:["createdAt","updatedAt"]},
                include:[{model:Role , attributes:["rol"]},
                         {model:DocumentType, attributes:["name_document_type"]},
                         {model:Nacionality, attributes:["name_nacionality"]},
                         {model:UserStatus, attributes:["name_status"]}
                ]
            })
            let usersFB = adminapp.auth().listUsers(1000, nextPageToken)
            Promise.all([usersDB,usersFB])
            .then((response) => {
            let sendUsers= []
            let Database = response[0] 
            let Firebase = response[1].users.map(u => {
                return {
                    id_user: u.uid,
                    emailFireBase: u.email,
                    disabled: u.disabled,
                    lastSignIn: u.metadata.lastSignInTime,
                    creationTime: u.metadata.creationTime,
                    registrationOrigin: u.providerData[0].providerId
                }
            });
            if (response[1].pageToken) {
                listAllUsers(response[1].pageToken);
            }
            for (let i = 0; i < Database.length; i++) {
                for (let j = 0; j < Firebase.length; j++) {
                    if(Database[i].id_user === Firebase[j].id_user){
                        sendUsers.push({...Database[i].dataValues,...Firebase[j]})
                        break;
                    }
                    
                }

            }
            return res.send(sendUsers)
        })
        .catch((e) => next(e))
    }
    listAllUsers()
};

//----------------------------------------------------------------

function banUser (req,res,next) {
    let {id, boolean} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        disabled: boolean,
    })
    .then((userRecord) => {
        return res.send(userRecord);
    })
    .catch(e=>next(e));
}

function resetEmailUser (req,res,next) {
    let {id, email} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        email: email,
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch(e=>next(e));

}

function resetPassUser (req,res,next) {
    let {id} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        password: "valuecaracteristics07",
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch(e=>next(e));

}

module.exports ={
    banUser,
    resetEmailUser,
    resetPassUser,
    readUsers
}