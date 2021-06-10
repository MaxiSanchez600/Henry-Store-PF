import { User, Roles, Status } from '../db.js'

function postUser (req,res,next) {
    let { registerOrigin, username, email, firstname, lastname } = req.body;
    switch (registerOrigin){
        case 'github':{
            User.create({username})
            .then((userCreated)=>{
                console.log(`Usuario ${username} creado desde github`)
                userCreated.setRoles(1)
                userCreated.setUserStatus(/*PREGUNTAR A MAXI QUE ESTADOS HAY */)
            })
        }
        case 'google':{
            User.create({
                email,
                name = firstname,
                last_name = lastname
            })
            .then()
        }
        default:{
            //entro con email/contraseña
        }
    }
}


module.exports ={
    postUser
}