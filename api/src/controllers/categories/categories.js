const { Category, SubCategory } = require('../../db');

const categoriesController = {
    getCategories: (req, res, next) => {
        Category.findAll({
            attributes: ['id_category', 'name_category'],
            include: [{
                model: SubCategory,
                attributes: ['id_sub_category', 'name_sub_category', 'description']
            }]
        })
        .then( response => {
            res.send(response);
        })
        .catch(e => next(e));
    },

    createCategories: (req,res,next) => {
        let {category} = req.body;
        Category.create({
            name_category: category
        })
        .then(()=>res.sendStatus(200))
        .catch(e=>next(e));
    },

    updateCategories: (req,res,next) => {
        let {id,name} = req.body;
        Category.update({
            name_category:name
        },
        {
            where:{id_category:id}
        })
        .then(res.sendStatus(200))
        .catch(e=>next(e))
    },

    deleteCategories: (req,res,next) => {
        let {id} = req.body;
        SubCategory.destroy({
            where:{
                CategoryIdCategory:id
            }
        })
        .then(()=>{
            Category.destroy({
                where:{
                    id_category:id
                }
            })
        })
        .then(()=>res.sendStatus(200))
        .catch(e=>next(e))
    }
}

module.exports = categoriesController;