import React, { useEffect } from 'react'
import './Cartpay.scss'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import { URL_BASE, henryExchangeRoute} from '../../../Config/index.js'

export function Cartpay(props){
    const [henryExchange, sethenryExchange] = React.useState(0)
    let history = useHistory()
    const [hc, sethc] = React.useState(0)
    let onClickLabel = (e) =>{
      if(localStorage.getItem('userlogged') !== null){
          if(e.target.innerText === 'Máximo'){
            console.log(props)
            if((props.userhc * henryExchange) > props.pricetotal){
              sethc(0)
            }
            else{
              sethc(props.userhc)
            }
          }
          else if(e.target.innerText === 'Reset'){
            sethc(0)
          }
          else{
            console.log((hc + parseInt(e.target.innerText)) * henryExchange)
            if(((hc + parseInt(e.target.innerText)) * henryExchange) < props.pricetotal){
              if(!(hc + parseInt(e.target.innerText) > props.userhc))
              {
                sethc(hc + parseInt(e.target.innerText))
              }
            }
          }
      }
    }

    useEffect(async () =>{
      sethenryExchange(await henryExchangeRoute())
      sethc(0)
    },[localStorage.getItem('userlogged'), localStorage.getItem('userid')])


    let OpenRegister = () =>{
      document.getElementById('buttonRegister').click();
    }
    
    let onSubmitCart = () =>{
      if(props.carritoactual.length > 0){
        let useractual = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : localStorage.getItem('userid')
        axios.post(URL_BASE + `cart/setpriceandgetid`, {
            userid: useractual,
            price: props.pricetotal,
            hc: hc,
            hccart: props.hctotal
        })
        .then(value =>{
            history.push(`/checkout/${value.data.id_order}`)
        })
      } 
      else{
        alert('carrito vacio')
      }
    }
    return(
            <div className = 'Contenedor_CartPay'>
              <h1 className = 'PayConteinerH1_CartPay'>RESUMEN DE LA COMPRA</h1>
              <div className= "topPrice_pay">
                <div className = 'TotalPrice_CartPay'>
                  <h2 className ='Label1_Cartpay'>TOTAL</h2>
                  <h2 className ='Label2_Cartpay'>{((props.pricetotal - (hc * henryExchange)) * props.currencyactual).toFixed(2)} {props.currencyactualname}</h2>
                </div>
                {(localStorage.getItem('userlogged') != null) ? <label className ='Label3_Cartpay'>¡Utilizando {hc} de tus <span>{props.userhc} Henry Coins</span> ahorras <span>{(hc * henryExchange) * props.currencyactual} {props.currencyactualname}</span></label> : <label label className ='Label3_Cartpay'>Al no estar logeado no dispones de <span>Henry Coins</span> para
                utilizar en tu compra.</label>}
              </div>
              <div className = 'HC_CartPay'>
                  <div className = 'HCAmount_CartPay'>
                      <h1>HENRY COINS</h1>
                      <h2>{hc}</h2>
                  </div>
                <div className = 'HCSelect_CartPay'>
                  <label onClick = {onClickLabel} value = "aaa">100</label>
                  <label onClick = {onClickLabel} value = {50}>50</label>
                  <label onClick = {onClickLabel} value = {10}>10</label>
                  <label onClick = {onClickLabel} value = {5}>5</label>
                  <label onClick = {onClickLabel} value = {1}>1</label>
                  <label onClick = {onClickLabel} value = 'm'>Máximo</label>
                  <label onClick = {onClickLabel} value = 'r'>Reset</label>
                </div>
                {(localStorage.getItem('userlogged') != null) ? <label>¡Al estar logeado con esta compra ganas <span>{props.hctotal} Henry Coins!</span></label>
                : <label>Al no estar logeado perdes el beneficio de ganar <span>{props.hctotal} Henry Coins</span> con tu compra.</label>}
                <br></br>
                <br></br>
                {(localStorage.getItem('userlogged') === null) && <label>Si ya tenes tu carrito listo, pero no estas registrado... ¡Podes <span className = 'SpanRegister_Cartpay' onClick = {OpenRegister}>registrate aqui</span> y se cargara automaticamente!</label>}
                {(props.carritoactual.length > 0) && <button className = 'buttoncheckout_CartPay' onClick = {onSubmitCart}>CHECKOUT</button>}
              </div>
  
            </div>
    )
}

const mapStateToProps = (state) => {
    return{
      userid: state.user_id,
      pricetotal: state.products.price,
      hctotal: state.products.hc,
      userhc: state.users.dataUSerLogin.hc,
      currencyactual: state.products.currency,
      currencyactualname: state.products.currencyname,
      carritoactual: state.products.carrito,
      
    }
  }
  
export default connect(
    mapStateToProps,
  )(Cartpay);
  