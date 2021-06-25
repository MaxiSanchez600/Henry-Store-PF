import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {GET_DETAIL_ORDER} from "../../../../Config/index";

const OrderDetail = (props) => {
    const idUrl = props.match.params.id;
    console.log(idUrl);

    const [detailOrder, setDetailOrder] = useState();

    useEffect(() => {
    axios.get(`${GET_DETAIL_ORDER}?id=${idUrl}`)
    .then((response) => {
        // setOrders(myOrder)
        // console.log(orders);
    })
    .catch((e)=>{
        alert(e);
       // setDetailOrder(myOrder)
        console.log(detailOrder);
        })
    }, []);

    return (
        <div>
            <h2>Detalle de la orden numero :{idUrl}</h2>
        </div>
    );
};

export default OrderDetail;