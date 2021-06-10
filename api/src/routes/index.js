const ProductsJson = require('../data/products.json')
const fs = require("fs");
const path = require('path');
const { Router } = require('express');
const { Products, Categories, SubCategories, Caracteristics, Tags, ProductCaracteristic, ProductCategory, ProductTags, KindPromotion, ProductPromotion, Reviews, Users, DocumentType, UserStatus, Roles, Favorites, Wishlist } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsRouter = require('./products');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', productsRouter);


module.exports = router;
