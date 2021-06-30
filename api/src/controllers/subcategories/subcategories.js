const { SubCategory, ProductCaracteristic } = require('../../db');

const subcategoriesController = {
    getSubCategories: (req,res,next) => {
        let { id_category} = req.query;
        id_category = Number(id_category)
         SubCategory.findAll({
                where:{
                    CategoryIdCategory: id_category
                },
                order:[['name_sub_category', 'ASC']],
            })
        .then(response=>res.send(response))
        .catch(e=>next(e))
    },

    createSubCategories: (req,res,next) => {
        let { id_category, nameSubcat} = req.body;
         SubCategory.create({
                name_sub_category: nameSubcat
            })
        .then(response=>{
            response.setCategory(id_category)
            return res.sendStatus(200)
        })
        .catch(e=>next(e))
    },

    updateSubCategories: (req,res,next) => {
        let {idSubcat, name} = req.body;
        SubCategory.findByPk(idSubcat)
        .then(response=>{
            let changevalue_car = ProductCaracteristic.update({
                value_caracteristic: name
            },{
                where:{
                    value_caracteristic: response.name_sub_category
                }
            })
            response.name_sub_category = name
            return Promise.all([response.save(),changevalue_car])   
        })
        .then((response)=>res.send(response))
        .catch(e=>next(e))
    },

    deleteSubCategories: (req,res,next) => {
        let { id_subcat } = req.body;
        SubCategory.findByPk(id_subcat)
        .then((response)=>{
           return ProductCaracteristic.findAll({
                where:{
                    value_caracteristic: response.name_sub_category
                }
            })
        })
        .then((result)=>{
            result.forEach(e=>{
                e.destroy()
            })
            SubCategory.destroy({
                where:{
                    id_sub_category:id_subcat
                }
            })
        })
        .then(()=>res.sendStatus(200))
        .catch((e)=>next(e))
    }
}

module.exports = subcategoriesController;