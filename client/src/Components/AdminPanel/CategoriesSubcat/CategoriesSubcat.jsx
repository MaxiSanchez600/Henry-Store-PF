import axios from "axios"
import "./CategoriesSubcat.scss"
import { useEffect, useState } from "react"
import { GET_CATEGORIES } from "../../../Config"
import {addCategory, addsubCategory, actionsSubcategory, actionsCategory} from "./actionsUponCatSubcat/actionsUponCatSubcat"
import { RiSettings4Fill } from "react-icons/ri";

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
            <h1>Panel de categorias</h1>
            <div className='catAndSubcat'>
            <div className="categories_subcategoriesWrap">
                <div className='catContainer'>
                    <div className="header-left">
                        <h3>Categorias</h3>
                        <div className='textListCat'>Seleccione una categoria para ver el listado de subcategorias:</div>
                        
                    </div>
                    <div className="container-buttons-categories">
                        {categories?.map(cat=>{
                            return <div className='buttonCatWrap'>
                                    <button className='configIcon' onClick={()=>actionsCategory(setReset, cat.id_category,setCard,card,initialState)}><RiSettings4Fill/></button>
                                    <button id={cat.name_category} className={card.title===cat.name_category ? "active" : 'unActive'} onClick={()=>chargeCard(cat)}>{cat.name_category}</button>
                                </div>
                        })}
                    <button className='newCategory' onClick={()=>addCategory(setReset)}>Nueva Categoria</button>
                    </div>
                </div>
            
                {card.title !== ''?
                    <div className='subcatCont'>
                        <div className="subcatWrap">
                            <div>
                                <h3>Subcategorias</h3>
                            </div>
                            <div className="container-buttons-subcategories">
                                {card.subcat?.map(e=>{
                                    return <div className='subcategory'>
                                                <button className='configIcon' onClick={()=>{actionsSubcategory(setReset, e.id_sub_category,card,setCard)}}><RiSettings4Fill/></button>
                                                <label>{e.name_sub_category}</label>
                                        </div>
                                })}
                            </div>
                            <button className='newSubcategory' onClick={()=>addsubCategory(setReset,card,setCard)}>Nueva Subcategoria</button>
                        </div>
                    </div>:null}
                            
            </div>
            </div>
        </div>)
}