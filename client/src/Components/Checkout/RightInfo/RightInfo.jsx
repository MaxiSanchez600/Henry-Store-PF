import axios from 'axios';
import React, { useEffect } from 'react'
import ProductCartCheckOut from './ProductCartCheckOut/ProductCartCheckOut';
import PayComp from './PayComp/PayComp'
import { useParams } from 'react-router-dom';
import './RightInfo.scss'
import { URL_BASE } from '../../../Config/index.js'

export default function RightInfo(props){
    const orderid = props.orderid
    const [carrito, setCarrito] = React.useState([])
    const useractual = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : localStorage.getItem('userid')
    useEffect(() =>{
      axios.get(URL_BASE + `cart/getorderdetails?userid=${useractual}`)
      .then(value =>{
        setCarrito(value.data)
      })
      
    //    axios.get(URL_BASE + `http://localhost:3001/cart/getorder?id=${orderid}`)
    //    .then(value =>{
    //      setOrder(value.data)
    //    })
    }, [])
    return(
        <div className = 'RightInfoConteiner_RightInfo'>
            <div className = 'ConteinerInfo_RightInfo'>
                <div className = 'ConteinerResumen_RightInfo'>
                    <h1 className = 'h1Resumen_RightInfo'>RESUMEN DE COMPRA</h1>
                    <div>
                        {carrito.map(product => <ProductCartCheckOut productInfo = {[product]}/>)}
                    </div>
                </div>
                <h1><PayComp orderid = {orderid}/></h1>
            </div>
        </div>
    )
}

//http://localhost:3001/cart/getorder?id=