import React, { useEffect } from 'react'
import {MdKeyboardArrowDown} from "react-icons/md"

import "./ProductCartCheckOut.scss"
export default function ProductCartCheckOut({productInfo}){
    const currency = localStorage.getItem("currency")
    const currencyname = localStorage.getItem("currencyname")
    const product = productInfo[0]
    const [carac, setCarac] = React.useState()
    const [active, setActive] = React.useState()
    const onclickicon = "rotate"
    const onclickiconback = 'rotatebackwards'
    const scaleproduct = "scaleproduct"
    console.log(product)
    let getLabels = () =>{
        let labels = []
        for(const label in product.caracteristics){
            labels.push(product.caracteristics[label])
        }
        return labels
    }
    const wrapperActivate = () =>{
        console.log('eeeeeee')
        showCarac()
        scaleActivate()
    }
    const showCarac = () =>{
        setCarac(!carac)
    }
    const scaleActivate = () =>{
        setActive(true)
        setTimeout(() => {setActive(false)}, 250)
    }
    return(
        <div onClick = {wrapperActivate} className = {['FullContainer_PCCC', (active === true) && scaleproduct].filter(e => !!e).join(' ')}>
            <div className = 'divContainerTitlePrice_PCCC'>
                <div>
                    <h1 className = 'h1ProductName_PCCC'>{product.product_name}</h1>
                    <h2 className = 'h2Multi_PCCC'>x{product.actual_amount}</h2>
                </div>
                <div>
                    <h1 className = 'h1ProductTotal_PCCC'>{(product.precio * product.actual_amount) * currency}</h1>
                    <label className = 'CurrencyName_PCCC'>{currencyname}</label>
                    <MdKeyboardArrowDown className = {["Arrow_PCCC", (carac === true) ? onclickicon : ((carac === false) && onclickiconback)].filter(e => !!e).join(' ')}></MdKeyboardArrowDown>
                </div>
            </div>
            {carac && <div className = 'divContainerAmountCarac_PCCC'>
                <div className = 'Cart_PCCC--labels'>
                    {getLabels().map(element => <label className='Cart_PCCC--label'>{element}</label>)}
                </div>
            </div>}
        </div>
    )
}