import React from "react";
import './SubCategorySelected.scss'

function SubCategorySelected ({subCatSelected, setSubCatSelected}){
    const onCloseSubCat=(e)=>{
        const removeResults=subCatSelected[e.target.title].filter(element=> element!== e.target.value)
        setSubCatSelected({...subCatSelected,[e.target.title]:removeResults})
    }
    return(
        <div className='subCategorySelectedContainer'>
            {
                 Object.entries(subCatSelected).map(element =>(
                    element[1].length>0?
                    <div>
                        <div>{element[0]}</div>
                        <ul>
                        {
                            element[1].map(subCategory=>(
                                <li>{subCategory}
                                <button value={subCategory} title={element[0]} onClick={onCloseSubCat}>x</button>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                    :null
                )) 
            }
        </div>
        
    )
}


export default SubCategorySelected;