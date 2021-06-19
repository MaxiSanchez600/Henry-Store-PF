import React, { useState } from "react";
import './CategoriesSelected.scss'

function CategoriesSelected ({categoriesSelected, categoriesStateController}){

    const onclose=(e)=>{
        e.preventDefault()
        categoriesStateController({...categoriesSelected, [e.target.name]:false})
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
                            </div>:null
                        }
                    </div>
                ))
            }
        </div>
        
    )
}


export default CategoriesSelected;