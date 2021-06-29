const {CurrencyChange, Order, User, Role} = require('../../db');
const { Sequelize, or } = require('sequelize');
const Op = Sequelize.Op;
const url = "http://localhost:3000"

const paymentMethods = {
    createPayment: async (req, res) =>{
        console.log(req.query)
        let {totalprice, orderid, addressid} = req.query
        console.log(totalprice)
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
                success: url + `/home/cart/success/${orderid}/${addressid}`,
                failure: "https://www.youtube.com/watch?v=wEtEm0Y6EYc&ab_channel=MercadoPagoDevelopers",
                pending: "https://image.shutterstock.com/image-illustration/pending-rubber-stamp-260nw-120765172.jpg"
            },
            auto_return: "all"
        }
        mercadopago.preferences.create(preference)
        .then(response =>{
            let global = {}
            global.id = response.body.id;
            console.log(global.id)
            // res.send({
            //     "success": "1",
            //     "src" : "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js",
            //     "global_id" : response.body.id,
            //     "data_header_color" : "#61277B",
            //     "data_button_label" : "Comprar"
            // }
            // );
            res.send(global)
        })
    },

    OrderToPagado: async (req, res, next) =>{
        const {orderid, direcid, paymentid, userid} = req.query
        let email = ""
        let pricetotal;
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
            }
        });

        var mailOptions = {
            from: 'henrystorecommerce@gmail.com',
            to: 'maxsanchezg@gmail.com',
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
                    value.status = "pagado"
                    value.UserAddressId = direcid
                    value.paymentid = paymentid
                    await value.save()
                });
            }
            res.send(pricetotal + "")
        })
        .catch(error =>{
            next(error)
        })
    }

}

module.exports = paymentMethods