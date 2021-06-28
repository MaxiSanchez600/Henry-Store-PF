const { Product, Category, SubCategory, Tag, Caracteristic, Image, ProductCaracteristic } = require('../../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const filtersCreator = require('../controllersUtils/products');
const modelExtractor = require('../controllersUtils/modelExtractor');

const productsController = {
    getProducts: async (req, res, next) => {
        
        try {
            let {
                id = 'not passed',
                tag = 'not passed',
                category = 'not passed',
                rangePriceMin = 'not passed',
                rangePriceMax = 'not passed',
                page = 1,
                orderType = 'id_product',
                orderDirection = 'ASC',
                ...caracteristics
            } = req.query;
            //nos aseguramos que no haya problema con los rangos de precio
            if(rangePriceMax === '') {
                rangePriceMax = 'not passed';
            }
            if(rangePriceMin === '') {
                rangePriceMin = 'not passed';
            }

            //seteo el limit y el offset, es decir, la pagina
            const perPage = 100;
            const current = (page * perPage) - perPage;

            //uso filtersCreator para filtrar por tags, categorias o rangos de precios en una primera estancia
            const products = await Product.findAll({
                ...filtersCreator(tag, category, rangePriceMin, rangePriceMax, id),
            });

            // guardo solo los id de la primera instancia de filtro
            let productsId = [];
            for(let i = 0; i <= products.length - 1; i++) {
                productsId.push(products[i].id_product)
            }

            // si tengo caracteristicas para filtrar entro acá
            if(Object.keys(caracteristics).length > 0) {
                //primero busco los id de las caracteristicas que me importan
                var caracteristicComplete = [];
                const caracteristicsSearch = await Caracteristic.findAll();
                for( let j = 0; j <= Object.keys(caracteristics).length - 1; j++) {
                    for(let k = 0; k <= caracteristicsSearch.length - 1; k++) {
                        if(Object.keys(caracteristics)[j] === caracteristicsSearch[k].name_caracteristic) {
                            caracteristicComplete.push({
                                id: caracteristicsSearch[k].id_caracteristic,
                                name: Object.keys(caracteristics)[j],
                                value: Object.values(caracteristics)[j]        
                            })
                        }
                    }
                }

                // hago un bucle de filtrado por cada una de las características, por cada vez que filtro guardo los id resultado en prodctsId
                // las filtraciones se detienen cuando ya no hay mas caracteristicas para filtrar o porque productsId quedó vació (no se encontró nada)
                for(let l = 0; l <= caracteristicComplete.length - 1; l++) {
                    if(productsId.length > 0) {
                        var productsFiltered = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: {
                                    [Op.or]: productsId
                                },
                                CaracteristicIdCaracteristic: caracteristicComplete[l].id,
                                value_caracteristic: caracteristicComplete[l].value
                            }
                        });
                        productsId = [];
                        for(let m = 0; m <= productsFiltered.length - 1; m++) {
                            productsId.push(productsFiltered[m].ProductIdProduct);
                        }
                    }
                }
            }

            //  luego de haber pasado por todos los filtrados, busco los id de productsId, con un ordenamiento y paginado, o si no devuelvo un array vacío
            if(productsId.length > 0) {
                var result = await Product.findAll({
                    where: {
                        id_product: {
                            [Op.or]: productsId
                        }
                    },
                    include: [
                        { model: Tag, attributes: ['id_tag', 'name_tag'], through: { attributes: [] } },
                        { model: Category, attributes: ['id_category', 'name_category'], through: { attributes: [] } },
                        { model: Caracteristic, attributes: ['id_caracteristic', 'name_caracteristic'], through: { attributes: ['value_caracteristic'] } },   
                        { model: Image, attributes: ['id_image', 'name_image']  }
                    ],
                    order: [[orderType, orderDirection]],
                    offset: current,
                    limit: perPage
                });
                
                // agregamos las caracteristicas sin usar el ORM
                var productsFinal = [];
                for(let n = 0; n <= result.length - 1; n++) {
                    //primero clonamos cada objeto producto y lo introducimos en nuestro arreglo final
                    productsFinal.push({
                        id_product: result[n].id_product,
                        name: result[n].name,
                        description: result[n].description,
                        price: result[n].price,
                        unit_stock: result[n].unit_stock,
                        henry_coin: result[n].henry_coin,
                        weight: result[n].weight,
                        size: result[n].size,
                        percentage_discount: result[n].percentage_discount,
                        promotion: result[n].promotion,
                        Tags: result[n].Tags,
                        Categories: result[n].Categories,
                        Images: result[n].Images,
                        Caracteristics: []
                    });
                    for(let o = 0; o <= result[n].Caracteristics.length - 1; o++) {
                        // para cada caracteristica dentro de un producto, ingresamos su id y su name
                        productsFinal[n].Caracteristics.push({ id_caracteristic: result[n].Caracteristics[o].id_caracteristic, name_caracteristic: result[n].Caracteristics[o].name_caracteristic })
                        // hacemos una consulta a ProductCaracteristic para traernos todos los valores que coincidan
                        // simultaneamente con el id del producto y el id de la caracteristica
                        var allCaracteristicsProduct = await ProductCaracteristic.findAll({
                            where: {
                                ProductIdProduct: result[n].id_product,
                                CaracteristicIdCaracteristic: result[n].Caracteristics[o].id_caracteristic
                            }
                        });
                        // recorremos el array de resultados con los valores para cada caracteristica de un producto
                        for(let p = 0; p <= allCaracteristicsProduct.length - 1; p++) {
                            //añadimos los valores de una determinadad caracteristica dentro del arreglo Caracteristics
                            if(p === 0) {
                                productsFinal[n].Caracteristics[o].values_caracteristic = [allCaracteristicsProduct[p].value_caracteristic];
                            } else {
                                productsFinal[n].Caracteristics[o].values_caracteristic.push(allCaracteristicsProduct[p].value_caracteristic);
                            }
                        }
                    }
                }

                return res.send({
                    data: productsFinal,
                    queries: req.query
                });
            }
            return res.send({
                data: [],
                queries: req.query
            });

        } catch (error) {
            return next(error);
        }
    },
    setProduct: async (req, res, next) => {

        try {
            let {
                idProduct = 'not passed',
                infoProduct = {},
                categories = {},
                caracteristics = {}, 
                tags = [],
                images = [],
            } = req.body;

            //guardare los nombres de las subcategorias en caracteristics.type
            if(Object.values(categories).flat().length > 0) {
                caracteristics.type = Object.values(categories).flat();
            }


            //incluyo las palabras del name como tags, tambien elimino los repetidos
            tagsAux = [...tags, ...infoProduct.name.toLowerCase().split(' ')];
            let tagsAuxUnique = new Set(tagsAux),
            tagsAll = [...tagsAuxUnique];

            //si no recibo ninguna imagen le asigno una por defecto
            if(images.length === 0) {
                images.push('https://redi.eu/wp-content/uploads/2015/08/not-available.png');
            }

            //primero verifico si existen las categorias que se seleccionaron, las subcategorias, los tags y las caracteristicas (si no las creo)
            //creo las categorias
            let categoriesMapped = Object.keys(categories).map(category => {
                return Category.findOrCreate({
                    where: {
                        name_category: category // { [Op.ilike]: category } //checkear lo de ilike
                    } 
                });
            });
            let categoriesFind = await Promise.all(categoriesMapped); //categoriesFind = [[cat1, false], [cat2, true], [cat3, true]]

            //creo las subcategorias que no existen y las asocio a su categoria padre
            let subCategoriesFindAll = [];
            for(let key in categories) {
                //creo o encuentro las subcategorias por cada categoria (tambien las voy acumulando en subCategoriesFindAll, porque las voy a necesitar a todas al final)
                if(categories[key].length > 0) {
                    let subCategoriesMapped = categories[key].map(subCategory => {
                        return SubCategory.findOrCreate({
                            where: {
                                name_sub_category: subCategory //{ [Op.ilike]: subCategory } 
                            } 
                        });
                    })
                    let subCategoriesFind = await Promise.all(subCategoriesMapped); // cuando key = Ropa --> [[catBuzos, false], [catAbrigo, true]]
                    subCategoriesFindAll = [...subCategoriesFindAll, ...subCategoriesFind]; //en este punto las subcategorias recien creadas no estan asociadas a ninguna categoria
                    //asocio las creadas la categoria padre (las otras ya estan asociadas)
                    let subCategoriesCreated = subCategoriesFind.filter(element => element[1] === true); // [[catAbrigo, true]]
                    let categoryFather = categoriesFind.find(element => element[0].name_category === key);
                    for(let i = 0; i <= subCategoriesCreated.length - 1; i++) {
                        categoryFather[0].addSubCategory(subCategoriesCreated[i][0]);
                    }
                }
            }

           //creo los tags
            let tagsMapped = tagsAll.map(tag => {
                    return Tag.findOrCreate({
                        where: {
                            name_tag: tag //{ [Op.ilike]: tag } 
                        }
                    });
            });
            let tagsFind = await Promise.all(tagsMapped);

            //creo las imagenes
            let imagesMapped = images.map(image => {
                    return Image.create({
                            name_image: image //{ [Op.ilike]: tag } 
                    });
            });
            let imagesModel = await Promise.all(imagesMapped);
            
            //creo las caracteristicas
            let caracteristicsMapped = Object.keys(caracteristics).map(caracteristic => {
                return Caracteristic.findOrCreate({
                    where: {
                        name_caracteristic: caracteristic // { [Op.ilike]: caracteristic } //checkear lo de ilike
                    } 
                });
            });
            let caracteristicsFind = await Promise.all(caracteristicsMapped);

            //creo el producto
            if(idProduct === 'not passed') {
                var productSet = await Product.create({
                    name: infoProduct.name, 
                    price: infoProduct.price, 
                    description: infoProduct.description, 
                    unit_stock: infoProduct.unit_stock, 
                    henry_coin: infoProduct.henry_coin, 
                    weight: infoProduct.weight, 
                    size: infoProduct.size, 
                    percentage_discount: infoProduct.percentage_discount, 
                    promotion: 1
                });
            } else {
                await Product.update(    
                    infoProduct,
                    {
                        where: {
                            id_product: idProduct
                        }
                    }
                );
                var productSet = await Product.findByPk(idProduct);
            }

            //asocio el producto a las categorias, subcategorias (a traves de la caracteristica type), los tags y el resto de las carcteristicas
            let categoriesModel = modelExtractor(categoriesFind);
            // let subCategoriesModel = modelExtractor(subCategoriesFindAll);
            let tagsModel = modelExtractor(tagsFind);
            let caracteristicsModel = modelExtractor(caracteristicsFind);
            // let imagesModel = modelExtractor(imagesFind);

            await productSet.setCategories(categoriesModel);
            await productSet.setTags(tagsModel);
            await productSet.setImages(imagesModel);

            await ProductCaracteristic.destroy({ where: { ProductIdProduct: productSet.id_product } });

            for(let key in caracteristics) {
                let caracteristicModel = caracteristicsModel.find(model => model.name_caracteristic === key);
                let productCaracteristicsMapped = caracteristics[key].map(value => {
                    return ProductCaracteristic.create({
                        ProductIdProduct: productSet.id_product,
                        CaracteristicIdCaracteristic: caracteristicModel.id_caracteristic,
                        value_caracteristic: value
                    });
                });
                await Promise.all(productCaracteristicsMapped);
            }

            return res.send(productSet);
        } catch (error) {
            if(error.message === 'llave duplicada viola restricción de unicidad «Products_name_key»') {
                return res.status(502).send(error);
            }
            return res.status(500).send(error);
        }
    },
};

module.exports = productsController;