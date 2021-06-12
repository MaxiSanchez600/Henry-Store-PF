
const UserCreator = require ('./controllersUtils/registerCreator.js');

function postUser (req,res,next) {
    let { registerOrigin, username, email, firstname, lastname } = req.body;
    switch (registerOrigin){
        case 'github':{
            UserCreator(res, next, username);
            break;
        };
        case 'google':{
            UserCreator(res, next, null, email, firstname, lastname);
            break;
        };
        default:{
            UserCreator(res, next, null,email);
            break;
        };
    };
};


module.exports ={
    postUser
};