//aca va la funcion user.create
const { User } = require('../../db.js')

function userCreator (res, next, username, email, firstname, lastname, image) {
    User.create({ 
        username,
        email,
        image,
        name: firstname,
        last_name: lastname
    })
    .then((userCreated)=>{
        userCreated.setRole(1)
        userCreated.setUserStatus(1)
        res.send(userCreated)
    })
    .catch((e)=>next(e))
}

module.exports = userCreator