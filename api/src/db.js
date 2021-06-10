require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbUser,dbPass,dbHost,dbName} = require ('./utils/config/index.js')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPass}@${dbHost}/${dbName}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { products, categories, subCategories, caracteristics, tags, productCaracteristic } = sequelize.models;
//Relacion Tags Productos
tags.belongsToMany(products, {through: 'productTags'});
products.belongsToMany(tags, {through: 'productTags'});

//Relacion Productos Categories
categories.belongsToMany(products, {through: 'productCategory'});
products.belongsToMany(categories, {through: 'productCategory'});

//Relacion Categories SubCategories - Genero Getters y Setters
categories.hasMany(subCategories);
subCategories.belongsTo(categories);


//Relacion Productos Caracteristics
products.belongsToMany(caracteristics, {through: productCaracteristic});
caracteristics.belongsToMany(products, {through: productCaracteristic});
//RemeraHenry.addproductCaracteristic(Talle, {through : {value_caracteristic : 'L'}})



// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
