import React, {useEffect} from "react";
import './CategoriesSelected.scss'

function CategoriesSelected ({categoriesSelected, categoriesStateController, categoriesSaves, subCatSelected, setSubCatSelected, json, setJson, catBack}){
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
        //si se hace un check
/*         if(e.target.checked){
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
        }    */
        setJson({...json, categories:{...json.categories, [e.target.name]:[e.target.value]}})
        
    }
    return(
        <div className='categoriesSelectedContainer'>
            {
                Object.keys(json.categories)?.map( (cat, index) => (
                    <div className='tableSubCatWrap' key={index}>
                        {
                            
                            <div className='tableSubCat'>
                                <div className='titleAndClose'>
                                    <div>{cat}</div>
                                    <button onClick={onclose} name={cat}>x</button>
                                </div>
                                <div>
                                    <div className='checkText'>Seleccione una subCategorias:</div>
                                    <div className="checksContainer">
                                        {
/*                                             getSubCategories(e[0]).map((element, index2)=>(
                                                <div className='checksWrap' key={index2}>
                                                    <input type='radio' title={e[0]} value={element.name_sub_category} onChange={onChangeSubCat}></input>
                                                    <label>{element.name_sub_category}</label>
                                                </div>
                                            )) */

                                            catBack.find( catBack => catBack.name_category === cat).SubCategories?.map( subCat =>{
                                                
                                                return <label>
                                                    <input 
                                                        type='radio'  
                                                        value={subCat.name_sub_category}
                                                        name={cat} 
                                                        checked={json.categories[cat].includes(subCat.name_sub_category) ? true : false}
                                                        onChange={onChangeSubCat}
                                                        />
                                                        {subCat.name_sub_category}
                                                    <br/>
                                                </label>
                                                // <input type='radio'  name={subCat.name_sub_category}/>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            {/* <SubCategorySelected subCatSelected={subCatSelected} setSubCatSelected={setSubCatSelected} json={json} setJson={setJson}/> */}
        </div>
        
    )
}


export default CategoriesSelected;