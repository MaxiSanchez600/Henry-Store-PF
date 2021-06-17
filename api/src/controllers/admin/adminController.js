const adminapp = require ('../../utils/config/firebaseAdmin.js')

function banUser (req,res,next) {
    let {id, boolean} = req.body;
    adminapp
    .auth()
    .updateUser(id, {
        disabled: boolean,
    })
    .then((userRecord) => {
        res.send(userRecord);
    })
    .catch((error) => {
        console.log('Error updating user:', error);
    });

}

module.exports ={
    banUser
}