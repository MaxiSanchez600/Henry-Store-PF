import React, { useEffect } from 'react'
import './CartList.scss'
import { URL_BASE } from '../../../Config/index.js'
import { connect } from 'react-redux'
import CartDetail from '../CartDetail/CartDetail'
import {setCarrito} from '../../../Redux/actions/actionsProducts'
import { Fragment } from 'react'
import {Link} from "react-router-dom";

export function CartList(props){
    //sirve de algo este state? no esta leido user ni setUser
    const [user, setUser] = React.useState(localStorage.getItem('userlogged'))
    const [carrito, setCarrito] = React.useState([])
    let getCarrito = async() => {
        if(localStorage.getItem('userlogged') !== null){
            //Si hay un userid en el store => Esta logeado => Envio ese a la ruta.
            const options = {
                method: 'GET',
            }
            //Aca cargar las HC del usuario logeado en Redux para poder usarlas en cartpay
            const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${localStorage.getItem('userlogged')}`, options)
            const responsejson = await response.json()
            props.setCarrito(responsejson)
        }
        else{
            if(localStorage.getItem("userid") === null){
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
                const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${localStorage.getItem("userid")}`, options)
                const responsejson = await response.json()
                props.setCarrito(responsejson)
            }
        }
    }

    let getUser = () =>{
        if(localStorage.getItem('userlogged') !== null){
            return localStorage.getItem('userlogged')
        }
        else{
            return localStorage.getItem('userid')
        }
    }


    //Escucho un cambio en el estado por si se actualizan los amount o se borran
    useEffect(() =>{
        console.log(props.carritoactual)
        setCarrito(props.carritoactual)
    }, [props.carritoactual])

    //Escucho si se logea
    useEffect(async () =>{
        await getCarrito();
    },[props.userid])

    return( 
            <Fragment>
            {props.carritoactual.length > 0 ? <div className = 'CartContenedor_CartList'>
            {carrito.map(producto => <CartDetail userid = {getUser} product = {producto}></CartDetail>)}
            </div> : <div><h1 className = "CartContenedorH1Error_CartList">No hay productos en tu carrito.</h1> <Link to = "/home" className = "LinkRedirect_CartList">Volver al catalogo</Link></div>}
            </Fragment>

    )
}


const mapStateToProps = (state) => {
    return{
      userid: state.users.dataUSerLogin.id,
      carritoactual: state.products.carrito
    }
  }
  
export default connect(
    mapStateToProps,
    {setCarrito},
  )(CartList);
  