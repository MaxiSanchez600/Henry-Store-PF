import React from 'react'
import './CartBar.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'


export function CartBar(props){
    return(
        <div>
            <div className = 'CartGeneral_CartBar'>
                <div className = 'CartBarLeft_CartBar'>
                    <h1>TU CARRITO</h1>
                    <h2 className = 'CartItems_CartBar'>{props.carritoactual.length + ' ITEMS'}</h2>
                </div>
                <Link to = {'/home'} className = 'CartH2Continue_CartBar'>Continua con tu compra</Link>
            </div>
            <div className = 'CartLine_CartBar'>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
      carritoactual: state.products.carrito
    }
  }
  
export default connect(
    mapStateToProps
  )(CartBar);
  