import React, { useEffect } from 'react'
import axios from 'axios';
import { URL_BASE } from '../../../../Config/index.js'
import './PayComp.scss'
export default function PayComp({orderid}){
    const currency = localStorage.getItem("currency")
    const currencyname = localStorage.getItem("currencyname")
    const [order, setOrder] = React.useState([])
    const orderpricefinal = order.totalprice * currency
    useEffect(() =>{
         axios.get(URL_BASE + `cart/getorder?id=${orderid}`)
         .then(value =>{
             console.log(value.data)
             setOrder(value.data)
         })
    }, [])
    return(
        <div>
            <div className = 'TotalPrice_PayComp'>
                <h1 className = 'Total_PayComp'>TOTAL</h1>
                <div className = 'OrderCurrency_PayComp'>
                    <h1 className = 'Order_PayComp'>{orderpricefinal - (orderpricefinal * order.spenthc / 100)}</h1>
                    <label className = 'CurrencyName_PayComp'>{currencyname}</label>
                </div>
            </div>
            <label className = 'HCUtilizadas_PayComp'>{order.spenthc} HenryCoins utilizadas ahorrando un total de <span className = "Spent_CartPay">{orderpricefinal * order.spenthc / 100}{currencyname}.</span></label>
        </div>
    )
}