require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbUser,dbPass,dbHost,dbName} = require ('./utils/config/index.js')

//Conexion a Elephant => Agarrar Datos
// const sequelize = new Sequelize('postgres://lcfufdas:punlDUtNrlaLxI_bNDAsoEIU96Zmv-t_@motty.db.elephantsql.com/lcfufdas', {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

// Conexion Local => Pruebas
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

 //Capitalizamos los nombres de los modelos ie: product => Product
 let entries = Object.entries(sequelize.models);
 let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
 sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, SubCategory, Caracteristic, Tag, ProductCaracteristic, ProductCategory,
  ProductTag, KindPromotion, ProductPromotion, Review, User, DocumentType, UserStatus, Role, Favorite,
  Wishlist, Image, Nacionality} = sequelize.models;


//Relacion Tag Productos
Tag.belongsToMany(Product, {through: ProductTag});
Product.belongsToMany(Tag, {through: ProductTag});

//Relacion Productos Category
Category.belongsToMany(Product, {through: ProductCategory});
Product.belongsToMany(Category, { through: ProductCategory});

//Relacion Category SubCategory - Genero Getters y Setters
Category.hasMany(SubCategory);
SubCategory.belongsTo(Category); 

//Relacion Productos Caracteristic
Product.belongsToMany(Caracteristic, {through: {model: ProductCaracteristic, unique: false}});
Caracteristic.belongsToMany(Product, {through: {model: ProductCaracteristic, unique: false}});

//Relacion Productos Promotions
KindPromotion.belongsToMany(Product, {through: ProductPromotion});
Product.belongsToMany(KindPromotion, {through: ProductPromotion});

//Relacion Productos Review
Product.hasMany(Review);
Review.belongsTo(Product);

//Relacion Usuarios Review
User.hasMany(Review);
Review.belongsTo(User);

//Relacion Usuarios Identificacion
DocumentType.hasMany(User);
User.belongsTo(DocumentType);

//Relacion Usuario Rol
Role.hasMany(User);
User.belongsTo(Role);

//Relacion Usuario Status
UserStatus.hasMany(User);
User.belongsTo(UserStatus);

//Relacion Usuario Favoritos
User.belongsToMany(Product, {through: Favorite})
Product.belongsToMany(User, {through: Favorite})

//Relacion Producto Favoritos
User.belongsToMany(Product, {through: Wishlist})
Product.belongsToMany(User, {through: Wishlist})

//Relacion Producto Foto
Product.hasMany(Image);
Image.belongsTo(Product);

//Relacion Usuario Nacionalidad
Nacionality.hasMany(User);
User.belongsTo(Nacionality);


//Precarga Role
Role.count().then((value) =>{
  if(value < 3){
    let arrayconst = [Role.create({rol: 'user'}), Role.create({rol: 'admin'}), Role.create({rol: 'superadmin'})]
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
Category.count().then((value) => {
  if(value < 3){
    let arrayconst = [Category.create({name_category: 'Ropa'}), Category.create({name_category: 'Accesorios'}), Category.create({name_category: 'Otros'})]
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
SubCategory.count().then((value) =>{
  if(value < 9){ 
    const uno = SubCategory.create({
      name_sub_category: 'Remera',
      description: 'Descripcion de remera',
      CategoryIdCategory: 1
    })
    const dos = SubCategory.create({
      name_sub_category: 'Pantalon',
      description: 'Descripcion de pantalon',
      CategoryIdCategory: 1
    })
    const tres = SubCategory.create({
      name_sub_category: 'Buso',
      description: 'Descripcion de buso',
      CategoryIdCategory: 1
    })
    const cuatro = SubCategory.create({
      name_sub_category: 'Camisa',
      description: 'Descripcion de camisa',
      CategoryIdCategory: 1
    })
    const cinco = SubCategory.create({
      name_sub_category: 'Gorra',
      description: 'Descripcion de gorra',
      CategoryIdCategory: 1
    })
    const seis = SubCategory.create({
      name_sub_category: 'Taza',
      description: 'Descripcion de taza',
      CategoryIdCategory: 2
    })
    const siete = SubCategory.create({
      name_sub_category: 'Cuaderno',
      description: 'Descripcion de cuaderno',
      CategoryIdCategory: 2
    })
    const ocho = SubCategory.create({
      name_sub_category: 'Lentes',
      description: 'Descripcion de lentes',
      CategoryIdCategory: 2
    })
    const nueve = SubCategory.create({
      name_sub_category: 'PowerBank',
      description: 'Descripcion de powerbank',
      CategoryIdCategory: 3
    })
    Promise.all([uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve]).then((values)=> {
      console.log('Se cargaron las subcategory' + values)
    })
  }
})

//Precarga de caracteristic
Caracteristic.count().then((value) =>{
  if(value < 4){
    let constarray = ['color', 'size', 'genero', 'type']
    constarray.forEach(element => {
      Caracteristic.create({
        name_caracteristic: element
      })
    })
  }
})

//Precarga de Nacionalidades
Nacionality.count().then((value) =>{
  if(value < 4){
    let constarray = ['Argentina', 'Colombia', 'Mexico', 'Chile']
    constarray.forEach(element => {
      Nacionality.create({
        name_nacionality: element
      })
    })
  }
})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
