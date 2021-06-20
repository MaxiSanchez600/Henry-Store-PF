import React, {useEffect} from "react";
import SubCategorySelected from "../SubCategorySelected/SubCategorySelected";
import './CategoriesSelected.scss'

function CategoriesSelected ({categoriesSelected, categoriesStateController, categoriesSaves, subCatSelected, setSubCatSelected, json, setJson}){
    useEffect(()=>{
        setJson({...json, categories:subCatSelected})
    },[subCatSelected])
    const onclose=(e)=>{
        e.preventDefault()
        categoriesStateController({...categoriesSelected, [e.target.name]:false})
        setSubCatSelected({...subCatSelected,[e.target.name]:[]})
    }

    const getSubCategories = (category)=>{
        const result=categoriesSaves.find(e=>e.name_category.toLowerCase() ===category.toLowerCase() )
        return result.SubCategories
    
    }

    const onChangeSubCat = (e)=>{
        if(e.target.value !== ''){
            if(!subCatSelected.hasOwnProperty(e.target.title)){
                setSubCatSelected({...subCatSelected, [e.target.title]:[e.target.value]})
                

            }else{
                if(!subCatSelected[e.target.title].includes(e.target.value)){
                    const addSubCat=subCatSelected[e.target.title].concat(e.target.value)
                    setSubCatSelected({...subCatSelected, [e.target.title]:addSubCat})
               
                }
            }
        }
         
    }
    return(
        <div className='categoriesSelectedContainer'>
            {
                Object.entries(categoriesSelected).map( (e,index) =>(
                    <div key={index}>
                        {
                            e[1]===true?
                            <div>
                                <label>{e[0]}</label>
                                <button onClick={onclose} name={e[0]}>x</button>
                                <label>Seleccione una o mas subCategorias:</label>
                                <select onChange={onChangeSubCat} title={e[0]}>
                                    <option value=''>Seleccione</option>
                                    {
                                        getSubCategories(e[0]).map((element, index2)=>(
                                            <option value={element.name_sub_category} key={index2}>{element.name_sub_category}</option>
                                        ))
                                    }
                                </select>
                            </div>:null
                        }
                    </div>
                ))
            }
            <SubCategorySelected subCatSelected={subCatSelected} setSubCatSelected={setSubCatSelected} json={json} setJson={setJson}/>
        </div>
        
    )
}


export default CategoriesSelected;