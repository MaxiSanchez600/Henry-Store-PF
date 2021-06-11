require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbUser,dbPass,dbHost,dbName} = require ('./utils/config/index.js')

//Conexion a Elephant => Agarrar Datos
const sequelize = new Sequelize(`postgres://niclafoj:dwo8FTAn1rUijBkFSz-6m39g8gh1AS7x@motty.db.elephantsql.com/niclafoj`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//Conexion Local => Pruebas
// const sequelize = new Sequelize(postgres://${dbUser}:${dbPass}@${dbHost}/${dbName}, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });
console.log(modelDefiners)
// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach(model => model(sequelize));

 //Capitalizamos los nombres de los modelos ie: product => Product
 let entries = Object.entries(sequelize.models);
 let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
 sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Products, Categories, SubCategories, Caracteristics, Tags, ProductCaracteristic, ProductCategory,
  ProductTags, KindPromotion, ProductPromotion, Reviews, Users, DocumentType, UserStatus, Roles, Favorites, Wishlist } = sequelize.models;


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
Roles.hasMany(Users);
Users.belongsTo(Roles);

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
Roles.count().then((value) =>{
  if(value < 3){
    let arrayconst = [Roles.create({rol: 'user'}), Roles.create({rol: 'admin'}), Roles.create({rol: 'superadmin'})]
    arrayconst.map(async (element) =>{
      console.log('Se cargo el rol' + element)
      await element
    })
  }
})

//Precarga Status
 UserStatus.count().then((value) => {
   if(value < 3){
     let arrayconst = [UserStatus.create({name_status: 'incompleto'}), UserStatus.create({name_status: 'completo'}), UserStatus.create({name_status: 'eliminado'})]
     arrayconst.map(async (element) =>{
       console.log('Se cargo el estado' + element)
       await element
     })
   }
 })

//Precarga Categorias
Categories.count().then((value) => {
  if(value < 3){
    let arrayconst = [Categories.create({name_category: 'Ropa'}), Categories.create({name_category: 'Accesorios'}), Categories.create({name_category: 'Otros'})]
    arrayconst.map(async (element) =>{
      console.log('Se cargo la categoria' + element)
      await element
    })
  }
})

//Precarga documentTypes
DocumentType.count().then((value) =>{
  if(value < 4){
    let arrayconst = [DocumentType.create({name_document_type: 'dni'}), DocumentType.create({name_document_type: 'run'}), DocumentType.create({name_document_type: 'cc'}),  DocumentType.create({name_document_type: 'ife'})]
    arrayconst.map(async (element) =>{
      console.log('Se cargo el documenttype' + element)
      await element
    })
  }
})

//Precarga SubCategorias
const subarray = ['remera', 'pantalon', 'camisa']
SubCategories.count().then((value) =>{
  if(value < 9){ 
    const uno = SubCategories.create({
      name_sub_category: 'Remera',
      description: 'Descripcion de remera',
      categoryIdCategory: 1
    })
    const dos = SubCategories.create({
      name_sub_category: 'Pantalon',
      description: 'Descripcion de pantalon',
      categoryIdCategory: 1
    })
    const tres = SubCategories.create({
      name_sub_category: 'Buso',
      description: 'Descripcion de buso',
      categoryIdCategory: 1
    })
    const cuatro = SubCategories.create({
      name_sub_category: 'Camisa',
      description: 'Descripcion de camisa',
      categoryIdCategory: 1
    })
    const cinco = SubCategories.create({
      name_sub_category: 'Gorra',
      description: 'Descripcion de gorra',
      categoryIdCategory: 1
    })
    const seis = SubCategories.create({
      name_sub_category: 'Taza',
      description: 'Descripcion de taza',
      categoryIdCategory: 2
    })
    const siete = SubCategories.create({
      name_sub_category: 'Cuaderno',
      description: 'Descripcion de cuaderno',
      categoryIdCategory: 2
    })
    const ocho = SubCategories.create({
      name_sub_category: 'Lentes',
      description: 'Descripcion de lentes',
      categoryIdCategory: 2
    })
    const nueve = SubCategories.create({
      name_sub_category: 'PowerBank',
      description: 'Descripcion de powerbank',
      categoryIdCategory: 3
    })
    Promise.all([uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve]).then((values)=> {
      console.log('Se cargaron las subcategories' + values)
    })
  }
})

//Precarga de caracteristics
Caracteristics.count().then((value) =>{
  if(value < 4){
    let constarray = ['color', 'size', 'genero', 'type']
    constarray.forEach(element => {
      Caracteristics.create({
        name_caracteristic: element
      })
    })
  }
})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
