//aca va la funcion user.create
const { Users } = require('../../db.js')

function userCreator (res, next, username, email, firstname, lastname) {
    Users.create({ 
        user_name: username,
        email,
        name: firstname,
        last_name: lastname
    })
    .then((userCreated)=>{
        userCreated.setRole(1)
        userCreated.setUserStatus(0)
        res.send(userCreated)
    })
    .catch((e)=>next(e))
}

module.exports = userCreator