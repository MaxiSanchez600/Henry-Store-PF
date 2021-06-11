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
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Products, Categories, SubCategories, Caracteristics, Tags, ProductCaracteristic, ProductCategory,
  ProductTags, KindPromotion, ProductPromotion, Reviews, Users, DocumentType, UserStatus, Role, Favorites, Wishlist } = sequelize.models;

//Relacion Tags Productos
Tags.belongsToMany(Products, {through: ProductTags});
Products.belongsToMany(Tags, {through: ProductTags});

//Relacion Productos Categories
Categories.belongsToMany(Products, {through: ProductCategory});
Products.belongsToMany(Categories, { through: ProductCategory});

//Relacion Categories SubCategories - Genero Getters y Setters
Categories.hasMany(SubCategories);
SubCategories.belongsTo(Categories); 


//Relacion Productos Caracteristics
Products.belongsToMany(Caracteristics, {through: ProductCaracteristic});
Caracteristics.belongsToMany(Products, {through: ProductCaracteristic});

//let categories = Categories.create({
//  name_category: 'Ropa'
//}).then(
 // (category) => {
   // SubCategories.create({
     // name_sub_category: 'Pantalón',
      //description: 'Ropa de vestir'
    //}).then(
     // (subCategory) => {
       // category.addSubCategories(subCategory)
     // }
   // )
  //})

//Relacion Productos Promotions
KindPromotion.belongsToMany(Products, {through: ProductPromotion});
Products.belongsToMany(KindPromotion, {through: ProductPromotion});

//Product.AddKindPromotion('2x1', {through: {
  //'date_start': 'zzzz',
  //'date_end': 'zzzz',
  //'date_register': 'zzzz',
//}})


//Relacion Productos Review
Products.hasMany(Reviews);
Reviews.belongsTo(Products);

//Relacion Usuarios Review
Users.hasMany(Reviews);
Reviews.belongsTo(Users);

//Relacion Usuarios Identificacion
DocumentType.hasMany(Users);
Users.belongsTo(DocumentType);

//Anadir identificacion a usuario => UserCreado.AddDocumentType => dni => demas identificaciones


//Relacion Usuario Rol
Role.hasMany(Users);
Users.belongsTo(Role);

//Anadir rol a usuario => UserCreado.AddRoles() => 0,1,2 depende si es User, Admin, SuperAdmin


//Relacion Usuario Status
UserStatus.hasMany(Users);
Users.belongsTo(UserStatus);

//Anadir status a usuario => UserCreado.AddUserStatus() => 0,1,2 depende si es creado, actual, borrado

//Relacion Usuario Favoritos
Users.belongsToMany(Products, {through: Favorites})
Products.belongsToMany(Users, {through: Favorites})

//Relacion Producto Favoritos
Users.belongsToMany(Products, {through: Wishlist})
Products.belongsToMany(Users, {through: Wishlist})

//Precarga Roles
Role.count().then((value) =>{
  if(value < 3){
    const uno = Role.create({
      id_rol: 0,
      rol: 'user'
    })
    const dos = Role.create({
      id_rol: 1,
      rol: 'admin'
    })
    const tres = Role.create({
      id_rol: 2,
      rol: 'superadmin'
    })
    Promise.all([uno, dos, tres]).then((values)=> {
      console.log('Se cargaron los roles ' + values)
    })
  }
})

//Precarga Status
UserStatus.count().then((value) => {
  if(value < 3){
    const uno = UserStatus.create({
      id_status: 0,
      name_status: 'registrado'
    })
    const dos = UserStatus.create({
      id_status: 1,
      name_status: 'creado'
    })
    const tres = UserStatus.create({
      id_status: 2,
      name_status: 'borrado'
    })
    Promise.all([uno, dos, tres]).then((values)=> {
      console.log('Se cargaron los status ' + values)
    })
  }
})


//Precarga Categorias
Categories.count().then((value) => {
  if(value < 3){
    const uno = Categories.create({
      name_category: 'ropa'
    })
    const dos = Categories.create({
      name_category: 'accesorios'
    })
    const tres = Categories.create({
      name_category: 'otros'
    })
    Promise.all([uno, dos, tres]).then((values)=> {
      console.log('Se cargaron las categories' + values)
    })
  }
})

//Precarga SubCategorias
const subarray = ['remera', 'pantalon', 'camisa']
SubCategories.count().then((value) =>{
  if(value < 10){ 
    
  }
})
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
