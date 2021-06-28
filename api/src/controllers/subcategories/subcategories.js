const { SubCategory, ProductCaracteristic } = require('../../db');

const subcategoriesController = {

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
        .then(()=>res.sendStatus(200))
        .catch(e=>next(e))
    },

    deleteSubCategories: (req,res,next) => {
        let { id_subcat } = req.body;

        SubCategory.findAll({
            where:{
                CategoryIdCategory:id_subcat
            }
        })
        .then((response)=>{
            let array=response.map(e=>{
                return ProductCaracteristic.findAll({
                    where:{
                        value_caracteristic: e.name_sub_category
                    }
                })
            })
            return Promise.all(array)
        })
        .then((result)=>{
            res.send(result)
            result.flat().forEach(e=>{
                e.destroy()
            })
            SubCategory.destroy({
                where:{
                    CategoryIdCategory:id_subcat
                }
            })
        })
        .then(()=>res.sendStatus(200))
        .catch((e)=>next(e))
    }
}

module.exports = subcategoriesController;