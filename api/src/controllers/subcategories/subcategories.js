const { SubCategory, ProductCaracteristic } = require('../../db');

const subcategoriesController = {
    getSubCategories: (req,res,next) => {
        let { id_category} = req.query;
        id_category = Number(id_category)
         SubCategory.findAll({
                where:{
                    CategoryIdCategory: id_category
                }
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
        let {idSubcat, name , descriptionsub} = req.body;
        SubCategory.findByPk(idSubcat)
        .then(response=>{
            if (name){
                response.name_sub_category = name
            }
            if (descriptionsub){
                response.description = descriptionsub
            }
            return response.save()
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