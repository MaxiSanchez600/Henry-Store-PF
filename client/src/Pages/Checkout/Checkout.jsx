import React from 'react'
import { useParams } from 'react-router-dom';
import './CheckOut.scss'
import LeftInfo from '../../Components/Checkout/LeftInfo/LeftInfo'
import RightInfo from '../../Components/Checkout/RightInfo/RightInfo'
export default function Checkout(){
    const { id } = useParams();
    return(
        <div className = 'CheckOutConteiner_CheckOut'>
            <LeftInfo orderid = {id}></LeftInfo>
            <RightInfo orderid = {id}></RightInfo>
        </div>
    )
}