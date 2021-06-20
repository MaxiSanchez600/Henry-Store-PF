let admin = require("firebase-admin");

let serviceAccount = require('./keyadmin.json');

const adminapp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = adminapp