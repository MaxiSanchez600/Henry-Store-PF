import React, { createRef, useEffect } from 'react'
import axios from 'axios'
import './CartList.scss'
import { URL_BASE } from '../../../Config/index.js'
import { connect } from 'react-redux'
import CartDetail from '../CartDetail/CartDetail'
import {setCarrito} from '../../../Redux/actions/actions'
import Cartbar from '../CartBar/CartBar.jsx'


export function CartList(props){
    const [carrito, setCarrito] = React.useState([])
    let getCarrito = async() => {
        if(props.userid !== ''){
            //Si hay un userid en el store => Esta logeado => Envio ese a la ruta.
            const options = {
                method: 'GET',
            }
            const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${props.userid}`, options)
            const responsejson = await response.json()
            props.setCarrito(responsejson)
        }
        else{
            if(localStorage.getItem('userid') === null){
                //Si no hay un userid en el local storage ni en el store => Es guest => Le creo un user guest
                const userguest = await fetch(URL_BASE + 'cart/adduserguest', {method: 'PUT'})
                const userguestresponse = await userguest.json()
                localStorage.setItem('userid', userguestresponse.userid)
                const options = {
                     method: 'GET',
                }
                const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${userguestresponse.userid}`, options)
                const responsejson = await response.json()
                props.setCarrito(responsejson)
            }
            else{
                //Si hay un userid en el local storage es guest y ya tiene User Guest creado
                const options = {
                    method: 'GET',
                }
                const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${localStorage.getItem('userid')}`, options)
                const responsejson = await response.json()
                props.setCarrito(responsejson)
            }
        }
    }

    useEffect(async () =>{
        await getCarrito();
    }, [])

    useEffect(() =>{
        if(props.carritoactual.length != carrito.length){
            console.log('actualizo')
            setCarrito(props.carritoactual)
        }
    }, [props.carritoactual])
    return(
            <div className = 'CartContenedor_CartList'>
                    {(props.carritoactual.length > 0 && carrito.length === 0) && <h1>Cargando carrito</h1>}
                    {carrito.map(producto => <CartDetail userid = {props.userid} product = {producto}></CartDetail>)}
            </div>
    )
}


const mapStateToProps = (state) => {
    return{
      userid: state.user_id,
      carritoactual: state.carrito
    }
  }
  
export default connect(
    mapStateToProps,
    {setCarrito},
  )(CartList);
  