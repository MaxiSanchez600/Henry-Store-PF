const {CurrencyChange, Order, User, Role, HenryExchange, Nacionality} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const url = "http://localhost:3000"

const paymentMethods = {
    createPayment: async (req, res) =>{
        let {totalprice, orderid, addressid, residencia} = req.query
        let currency = 0;
        await CurrencyChange.findOne({where:{currencyName: "ARS"}})
        .then(value =>{
            console.log(value)
            currency = value.dataValues.currencyExChange
        })
        .catch(error =>{
            next(error)
        })

        var mercadopago = require('mercadopago');
        mercadopago.configure({
            access_token: "APP_USR-6642840300672372-062619-0deaff518a075f2dc836a4492dc55f75-209521005"
        });
        var preference = {
            items: [
              {
                title: 'Henry Store',
                description: "Henry E-Commerce merch",
                quantity: 1,
                currency_id: 'ARS',
                unit_price: (parseInt(totalprice) * currency)

              }
            ],
            back_urls: {
                success: url + `/home/cart/success/${orderid}/${addressid}/${residencia}`,
                failure: url + `/home/cart/failure/`,
                pending: url + `/home/cart/pending/`
            },
            auto_return: "all"
        }
        mercadopago.preferences.create(preference)
        .then(response =>{
            let global = {}
            global.currency = currency
            global.id = response.body.id;
            res.send(global)
        })
    },

    OrderToPagado: async (req, res, next) =>{
        const {orderid, direcid, paymentid, userid, residenceid} = req.query
        let email = ""
        let pricetotal;
        let pais;
        await Nacionality.findOne({where: {id_nacionality: residenceid}})
        .then(value =>{
            pais = value.name_nacionality
        })
        await User.findOne({where:{id_user: userid}})
        .then(value =>{
            email = value.dataValues.email
        })
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
            to: email,
            subject: 'Confirmacion de pago Henry Store',
            text: 'Gracias por su compra, su numero de orden es ' + orderid
        };

        Order.findOne({where:{id_order: orderid}})
        .then(async value =>{
            pricetotal = (value.totalprice - ((value.totalprice * value.spenthc) / 100))
            if(value.status === "carrito"){
                let spenthc = value.spenthc
                let givenhc = value.givenhc
                await User.findOne({where:{id_user: userid}})
                .then(async value =>{
                    let rol;
                    await Role.findOne({where: {id_rol: value.RoleIdRol}})
                    .then(value =>{
                        rol = value.rol
                    })
                    if(rol !== "guest"){
                        value.hcamount = ((value.dataValues.hcamount - spenthc) + givenhc)
                        value.save()
                    }
                })
                transporter.sendMail(mailOptions, async function(error, info){
                    if(direcid !== 'undefined'){
                        value.status = "pagado"
                        value.UserAddressId = direcid
                    }
                    else{
                        value.status = "coordinar"
                    }
                    value.NacionalityIdNacionality = residenceid
                    value.paymentid = paymentid
                    await value.save()
                });
            }
            let send = {
                pricetotal: pricetotal,
                pais: pais
            }
            res.json(send)
        })
        .catch(error =>{
            next(error)
        })
    },


    getHenryExchange: (req, res, next) =>{
       HenryExchange.findAll()
       .then(value =>{
            return res.send(value[0].exchange + "")
       })
       .catch(error =>{
           next(error)
       })
    }

}

module.exports = paymentMethods