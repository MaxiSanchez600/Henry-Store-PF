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
    }
}

module.exports = categoriesController;