import React, { useEffect } from 'react'
import axios from 'axios';
import { URL_BASE, henryExchangeRoute} from '../../../../Config/index.js'
import './PayComp.scss'
export default function PayComp({orderid}){
    const [henryExchange, sethenryExchange] = React.useState(0)
    const currency = localStorage.getItem("currency")
    const currencyname = localStorage.getItem("currencyname")
    const [order, setOrder] = React.useState([])
    const orderpricefinal = (order.totalprice - (order.spenthc * henryExchange)) * currency
    useEffect(async () =>{
        sethenryExchange(await henryExchangeRoute())
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
                    <h1 className = 'Order_PayComp'>{orderpricefinal}</h1>
                    {/* {(props.pricetotal - (hc * henryExchange)) * props.currencyactual} {props.currencyactualname} */}
                    <label className = 'CurrencyName_PayComp'>{currencyname}</label>
                </div>
            </div>
            <label className = 'HCUtilizadas_PayComp'>{order.spenthc} HenryCoins utilizadas ahorrando un total de <span className = "Spent_CartPay">{(order.spenthc * henryExchange) * currency}{currencyname}.</span></label>
        </div>
    )
}