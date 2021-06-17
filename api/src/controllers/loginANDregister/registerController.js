
const UserCreator = require ('../controllersUtils/userCreator.js');

function createUser (req,res,next) {
    let { registerOrigin, username, email, firstname, lastname, image } = req.body;
    switch (registerOrigin){
        case 'github.com':{
            UserCreator(res, next, username,null ,null ,null ,image ); 
            break;
        };
        case 'google.com':{
            UserCreator(res, next, null, email, firstname, lastname, image);
            break;
        };
        default:{
            UserCreator(res, next, null,email);
            break;
        };
    };
};


module.exports ={
    createUser
};