import React, {useEffect} from "react";
import SubCategorySelected from "../SubCategorySelected/SubCategorySelected";
import './CategoriesSelected.scss'

function CategoriesSelected ({categoriesSelected, categoriesStateController, categoriesSaves, subCatSelected, setSubCatSelected, json, setJson}){
    useEffect(()=>{
        setJson({...json, categories:subCatSelected})
        console.log(subCatSelected)  
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
        //si se hace un check
        if(e.target.checked){
            if(!subCatSelected.hasOwnProperty(e.target.title)){
                setSubCatSelected({...subCatSelected, [e.target.title]:[e.target.value]})   
                           
            }else{
                if(!subCatSelected[e.target.title].includes(e.target.value)){
                    const addSubCat=subCatSelected[e.target.title].concat(e.target.value)
                    setSubCatSelected({...subCatSelected, [e.target.title]:addSubCat})
                
                }
            }

            //si se hace uncheck
        }else{
            const resultRemove = subCatSelected[e.target.title].filter(element => element !== e.target.value)
            setSubCatSelected({...subCatSelected, [e.target.title]:resultRemove})
        }   
        
         
    }
    return(
        <div className='categoriesSelectedContainer'>
            {
                Object.entries(categoriesSelected).map( (e,index) =>(
                    <div className='tableSubCatWrap' key={index}>
                        {
                            e[1]===true?
                            <div className='tableSubCat'>
                                <div className='titleAndClose'>
                                    <div>{e[0]}</div>
                                    <button onClick={onclose} name={e[0]}>x</button>
                                </div>
                                <div>
                                    <div className='checkText'>Seleccione una o mas subCategorias:</div>
                                    <div className="checksContainer">
                                        {/* <select onChange={onChangeSubCat} title={e[0]}>
                                            <option value=''>Seleccione</option>
                                            {
                                                getSubCategories(e[0]).map((element, index2)=>(
                                                    <option value={element.name_sub_category} key={index2}>{element.name_sub_category}</option>
                                                ))
                                            }
                                        </select> */
                                            getSubCategories(e[0]).map((element, index2)=>(
                                                <div className='checksWrap' key={index2}>
                                                    <input type='checkbox' title={e[0]} value={element.name_sub_category} onChange={onChangeSubCat}></input>
                                                    <label>{element.name_sub_category}</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>:null
                        }
                    </div>
                ))
            }
            {/* <SubCategorySelected subCatSelected={subCatSelected} setSubCatSelected={setSubCatSelected} json={json} setJson={setJson}/> */}
        </div>
        
    )
}


export default CategoriesSelected;