import axios from "axios"
import "./CategoriesSubcat.scss"
import { useEffect, useState } from "react"
import { GET_CATEGORIES } from "../../../Config"
import {addCategory, editSubCategory, addsubCategory, deleteSubCategory, editCategory, deleteCategory} from "./actionsUponCatSubcat/actionsUponCatSubcat"

export default function Categories () {
    let initialState = {
        title: "",
        idcat: "",
        subcat: []
    }
    const [categories,setCategories] = useState([])
    const [card,setCard] = useState(initialState)
    const [reset,setReset] = useState(false)

    useEffect(()=>{
        axios.get(GET_CATEGORIES)
        .then(res=>{
            setCategories(res.data)
            setReset(false)
            if(card.subcat.length !== 0){
                document.querySelector(`#${card.title}`).click()
            }
        })
    },[reset])

    function chargeCard (cat) {
        setCard({
            ...card,
            title:cat.name_category,
            idcat: cat.id_category,
            subcat: cat.SubCategories
        })
    }

    return  (
        <div className="container_categories_subcategories">
            <div>
                <div className="header-left">
                    <h1>Categorias</h1>
                    <button onClick={()=>addCategory(setReset)}>Nueva Categoria</button>
                </div>
                <div className="container-buttons-categories">
                    {categories?.map(cat=>{
                        return <div>
                                <button id={cat.name_category} className="button-categories" onClick={()=>chargeCard(cat)}>{cat.name_category}</button>
                                <button onClick={()=>editCategory(setReset, cat.id_category,setCard,card)}>edit</button>
                                <button onClick={()=>deleteCategory(setReset, cat.id_category,setCard,initialState)}>delete</button>
                            </div>
                    })}
                </div>
            </div>
            <div>
                {card?<div>
                        <div>
                            <h1>Subcategorias</h1>
                            <h2>{card.title}</h2>
                            {card.title?<button onClick={()=>addsubCategory(setReset,card.idcat)}>Nueva Subcategoria</button>:null}
                        </div>
                        <div className="container-buttons-subcategories">
                            {card.subcat?.map(e=>{
                                return <div><span>{e.name_sub_category}</span>
                                            <button onClick={()=>{editSubCategory(setReset, e.id_sub_category)}}>edit</button>
                                            <button onClick={()=>{deleteSubCategory(setReset, e.id_sub_category)}}>delete</button>
                                       </div>
                            })}
                        </div>
                      </div>:null}
            </div>

        </div>)
}