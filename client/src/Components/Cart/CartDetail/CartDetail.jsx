import React from 'react'
import './CartDetail.scss'
import { URL_BASE } from '../../../Config/index.js'
import {setCarrito} from '../../../Redux/actions/actionsProducts'
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import {AiFillHeart} from 'react-icons/ai'


export function CartDetail(props){
    const [amount, setAmount] = React.useState(props.product.actual_amount)
    let getLabels = () =>{
        let labels = []
        for(const label in props.product.caracteristics){
            labels.push(props.product.caracteristics[label])
        }
        return labels
    }

    let getOptions = () =>{
        let numbers = []
        for(let i = 1; i <= props.product.amount_max; i++){
            numbers.push(i)
        }
        return numbers
    }

    let changeAmount = async (e) =>{
        let useridsend = ""
        setAmount(e.target.value)
        if(localStorage.getItem('userlogged') !== null)
        {
            useridsend = localStorage.getItem('userlogged')
        }
        else{
            useridsend = localStorage.getItem('userid')
        }
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                user_id: useridsend + "",
                new_amount: e.target.value,
                order_detail: props.product.orderdetail_id
            }),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }
        await fetch(URL_BASE + 'cart/editproductincart', options)
        const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${useridsend}`)
        const responsejson = await response.json()
        props.setCarrito(responsejson)
    }

    let deleteProduct = async () =>{
        let useridsend = ""
        if(localStorage.getItem('userlogged') !== null)
        {
            useridsend = localStorage.getItem('userlogged')
        }
        else{
            useridsend = localStorage.getItem('userid')
        }
        const options = {
            method: 'DELETE',
            body: JSON.stringify({
                user_id: useridsend + "",
                orderdetail_id: props.product.orderdetail_id
            }),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }
        await fetch(URL_BASE + 'cart/removeproductfromcart', options)
        const response = await fetch(URL_BASE + `cart/getorderdetails?userid=${useridsend}`)
        const responsejson = await response.json()
        props.setCarrito(responsejson);
    

          Swal.fire({
            title:`Producto eliminado del carrito `,
            icon:'success',
            iconColor: "#49AF41",
            showConfirmButton: false,
            timer:1500,
            timerProgressBar:true,
            position: 'bottom-end',
            toast:true,
            customClass:{
            popup: 'popup-errorUpdate_dataUser',
            title: 'title-errorUpdate_dataUser',
            confirmButton: 'confirmButton-errorUpdate_dataUser',
            },
            })
       
    }

    return(
        <div className = 'Cart_CartDetail'>
            <img src = {props.product.image} alt = 'fotoproducto'/>
            <div className="right_column_cart_detail">
                <div className = 'ProductTitle_CartDetail'>
                    <h1 className='Cart_CartDetail--h1'>{props.product.product_name}</h1>
                    <div className = 'ProductStripe_CartDetail'></div>
                </div>
                <div className = 'Cart_CartDetail--labels'>
                    {getLabels().map(element => <label className='Cart_CartDetail--label'>{element}</label>)}
                </div>
                <div className = 'CartCost_CartDetail'>
                        <select onChange = {changeAmount}>{getOptions().map(element =>
                            (element === props.product.actual_amount) ?
                            <option value = {element} selected = 'selected'>{element}</option> :
                            <option value = {element}>{element}</option>)}
                        </select>
                        <h2>{(props.product.precio * amount) * props.currencyactual}{props.currencyactualname}</h2>
                        <h2>{props.product.hc * amount + ' HC por tu compra'}</h2>
                </div>
                <div className = 'CartOptions_CartDetail'>
                    <div>
                        <div className="heart_product_Detail"><AiFillHeart/></div>
                    </div>
                    <h2 onClick = {deleteProduct} className = 'h2Delete_CartDetail'>Delete</h2>
                </div>
            </div>
        </div>
    )
}
//sirve de algo este mapstatetoprops?
const mapStateToProps = (state) => {
    return{
        currencyactual: state.products.currency,
        currencyactualname: state.products.currencyname,
    }
  }
  
  
export default connect(
    mapStateToProps,
    {setCarrito},
  )(CartDetail);
  