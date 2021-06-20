import React, { createRef, useEffect } from 'react'
import './Cartpay.scss'
import { connect } from 'react-redux'
import Modal from '../../Modal/Modal'
import Register from '../../Authentication/Register/Register'


export function Cartpay(props){
    const [hc, sethc] = React.useState(0)
    const [modalRegister, setModalRegister] = React.useState(false)
    let onClickLabel = (e) =>{
      if(localStorage.getItem('userlogged') !== null){
          if(e.target.innerText === 'Maximo'){
            sethc(props.userhc)
          }
          else if(e.target.innerText === 'Reset'){
            sethc(0)
          }
          else{
            if(!(hc + parseInt(e.target.innerText) > props.userhc))
            {
              sethc(hc + parseInt(e.target.innerText))
            }
          }
      }
    }

    useEffect(() =>{
      sethc(0)
    },[localStorage.getItem('userlogged'), localStorage.getItem('userid')])


    let OpenRegister = () =>{
      console.log('clickeo')
      document.getElementById('buttonRegister').click();

    }
   
    return(
            <div className = 'Contenedor_CartPay'>
              <h1 className = 'PayConteinerH1_CartPay'>RESUMEN DE LA COMPRA</h1>
              <div className= "topPrice_pay">
                <div className = 'TotalPrice_CartPay'>
                  <h2 className ='Label1_Cartpay'>TOTAL</h2>
                  <h2 className ='Label2_Cartpay'>{props.pricetotal - (hc * props.pricetotal / 100)} USD</h2>
                </div>
                {(localStorage.getItem('userlogged') != null) ? <label className ='Label3_Cartpay'>¡Utilizando {hc} de tus <span>{props.userhc} Henry Coins</span> tenes un <span>{hc}%</span>, ahorrando
                <span> {(hc * props.pricetotal / 100)}!</span></label> : <label label className ='Label3_Cartpay'>Al no estar logeado no dispones de <span>Henry Coins</span> para
                utlizar en tu compra.</label>}
              </div>
              <div className = 'HC_CartPay'>
                <div className = 'HCAmountDiv_CartPay'>
                  <div className = 'HCAmount_CartPay'>
                      <h1>HENRY COINS</h1>
                      <h2>{hc}</h2>
                  </div>
                </div>
                <div className = 'HCSelect_CartPay'>
                  <label onClick = {onClickLabel} value = "aaa">100</label>
                  <label onClick = {onClickLabel} value = {50}>50</label>
                  <label onClick = {onClickLabel} value = {10}>10</label>
                  <label onClick = {onClickLabel} value = {5}>5</label>
                  <label onClick = {onClickLabel} value = {1}>1</label>
                  <label onClick = {onClickLabel} value = 'm'>Maximo</label>
                  <label onClick = {onClickLabel} value = 'r'>Reset</label>
                </div>
                {(localStorage.getItem('userlogged') != null) ? <label>¡Al estar logeado con esta compra ganas <span>{props.hctotal} Henry Coins!</span></label>
                : <label>Al no estar logeado perdes el beneficio de ganar <span>{props.hctotal} Henry Coins</span> con tu compra.</label>}
                <br></br>
                <br></br>
                {(localStorage.getItem('userlogged') === null) && <label>Si ya tenes tu carrito listo, pero no estas registrado... ¡Podes <span className = 'SpanRegister_Cartpay' onClick = {OpenRegister}>registrate aqui</span> y se cargara automaticamente!</label>}
                <button className = 'buttoncheckout_CartPay'>CHECKOUT</button>
              </div>
  
            </div>
    )
}


const mapStateToProps = (state) => {
    return{
      userid: state.user_id,
      pricetotal: state.products.price,
      hctotal: state.products.hc,
      userhc: state.products.userhc
    }
  }
  
export default connect(
    mapStateToProps,
  )(Cartpay);
  