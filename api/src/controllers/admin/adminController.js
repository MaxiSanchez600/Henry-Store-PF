const adminapp = require ('../../utils/config/firebaseAdmin.js');
const { User, Role, DocumentType, Nacionality, UserStatus, Order, OrderDetail, Product, Image, HenryExchange, CurrencyChange } = require ('../../db.js');
const axios = require('axios')

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
    let defaultPassword = "soyHenrySTORE"
    adminapp
    .auth()
    .updateUser(id, {
        password: defaultPassword,
    })
    .then(() => {
        res.send(defaultPassword);
    })
    .catch(e=>next(e));

}

function readOrders (req,res,next) {
    let { filter, page, limit,order} = req.query;
    page = Number(page)
    limit= Number(limit)
    let result = {}
    const limitDefault = 5;
    const pageDefault = 1;
    const startIndex = ((page||pageDefault)-1) *(limit||limitDefault);
    const endIndex = (page||pageDefault) * (limit||limitDefault);
    Order.findAll({
        //ponerle un order por createdAt
        include:[
            {model: OrderDetail,
                include:{model: Product, 
                    include:{model: Image, attributes:['name_image']},
                    attributes:['name','price']}, 
                attributes:{exclude: ['createdAt', 'updatedAt','OrderIdOrder']}
            },
            {model: User, attributes:['name', 'email','username','phone']}
        ],
        order: [['createdAt',(order||"DESC")]],
    })
    .then((response)=>{
        result.total = response.length;
        if(!filter){
            result.results= response.slice(startIndex,endIndex)
            return res.send(result)
        }
        if(filter){
            result.results = response.filter(order=>{
                return order.status === filter.toLowerCase()
            }).slice(startIndex,endIndex)
            return res.send(result)
        }
    })
    .catch(e=>next(e))
    
}

function updateOrder (req, res, next) { 
let {id, oldstatus, newstatus, shipping_id} = req.body; //recibir el numero de envio y hacer busqueda del email del usuario con el id de la orden
    let tokenMP= "APP_USR-6642840300672372-062619-0deaff518a075f2dc836a4492dc55f75-209521005"
    if((oldstatus === "pagada" || oldstatus === "coordinar") && newstatus === "cancelada"){
        Order.findOne({
            where:{
                id_order: id
            }
        })
        .then(orderfound=>{
            let user = User.findByPk(orderfound.UserIdUser)
            let mp = axios.post(`https://api.mercadopago.com/v1/payments/${orderfound.paymentid}/refunds?access_token=${tokenMP}`)
            Promise.all([user,mp])
            .then((response)=>{
                var nodemailer = require('nodemailer');
                var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'henrystorecommerce@gmail.com',
                    pass: 'Bluebuff123'
                },
                tls: {
                    rejectUnauthorized: false
                }
                });
                var mailOptions = {
                    from: 'henrystorecommerce@gmail.com',
                    to: response[0].email,
                    subject: 'Devolución de dinero Henry Store',
                    text: `Se realizó la devolución del dinero por la orden n° ${response[1].paymentid}. Cualquier duda o consulta puede comunicarse con el personal de Henry Store. Saludos`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
                Order.update({
                    status: newstatus
                },
                {
                    where:{
                        id_order: id
                    }
                })
            })
            .then(()=>res.sendStatus(200))
            .catch(e=>next(e))
        })
        .catch(e=>next(e))
    }
    if(newstatus === "completa"){
        Order.findOne({
            where:{
                id_order: id
            }
        })
        .then(order=>{
            return User.findByPk(order.UserIdUser)
        })
        .then(result=>{
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'henrystorecommerce@gmail.com',
                    pass: 'Bluebuff123'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var mailOptions = {
                from: 'henrystorecommerce@gmail.com',
                to: result.email,
                subject: 'Confirmacion de envío Henry Store',
                text: `Gracias por su compra, puede hacer el seguimiento de su envio aquí: ${shipping_id}`
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
            Order.update({
                status: newstatus
            },
            {
                where:{
                    id_order: id
                }
            })
        })
        .then(()=>res.sendStatus(200))
        .catch(e=>next(e))
    }
    if(oldstatus==="carrito" && newstatus==="cancelada"){
        Order.update({
            status: newstatus
        },
        {
            where:{
                id_order: id
            }
        })
        .then(()=>res.sendStatus(200))
        .catch(e=>next(e))
    }
}

function getExchanges (req,res,next) {
    CurrencyChange.findAll({
        order:[["currencyName","ASC"]]
    })
    .then(response=>res.send(response))
    .catch(e=>next(e))
}
function getHenryCoinValue (req,res,next) {
    HenryExchange.findAll()
    .then(response=>res.send(response))
    .catch(e=>next(e))
}
function updateHenryCoinValue (req,res,next) {
    let {idhc,iduser,newvalue} = req.body
    newvalue = Number(newvalue)
    HenryExchange.update({
        exchange:newvalue,
        userid: iduser
    },{
        where:{
            id: idhc
        }
    })
    .then(response=>res.send(response))
    .catch(e=>next(e))
}
function updateExchanges (req,res,next) {
    let {idexchange,newvalue} = req.body
    CurrencyChange.update({
        currencyExChange: newvalue
    },{
        where:{
            id : idexchange
        }
    })
    .then((response)=>res.send(response))
    .catch(e=>next(e))
}

module.exports ={
    banUser,
    resetEmailUser,
    resetPassUser,
    readUsers,
    readOrders,
    updateOrder,
    getExchanges,
    updateExchanges,
    getHenryCoinValue,
    updateHenryCoinValue
}