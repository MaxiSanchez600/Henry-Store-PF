import React, { useState } from "react";
import CreateProduct from "../CreateProduc/CreateProduct";
import './EditProduct.scss'

function EditProduct (){
    const data={
        "id_product": 1,
        "name": "Buso Henry",
        "description": "Buzo elaborado en algodón perchado, de suave textura, estilo moderno , amplio bolsillo delantero, con estampado de Henry",
        "price": 1500,
        "unit_stock": 10,
        "henry_coin": 15,
        "weight": 100,
        "size": 50,
        "percentage_discount": 0,
        "promotion": 0,
        "Tags": [
          {
            "id_tag": 3,
            "name_tag": "Henry"
          },
          {
            "id_tag": 395,
            "name_tag": "Buzo"
          },
          {
            "id_tag": 1,
            "name_tag": "Buso"
          }
        ],
        "Categories": [
          {
            "id_category": 1,
            "name_category": "Ropa"
          }
        ],
        "Images": [
          {
            "id_image": 4,
            "name_image": "https://raw.githubusercontent.com/mathfalcon/Henry-Store-e-commerce/master/client/public/products/henryHoodie.png"
          }
        ],
        "Caracteristics": [
          {
            "id_caracteristic": 1,
            "name_caracteristic": "color",
            "values_caracteristic": [
              "Rojo"
            ]
          },
          {
            "id_caracteristic": 3,
            "name_caracteristic": "genero",
            "values_caracteristic": [
              "Unisex"
            ]
          },
          {
            "id_caracteristic": 4,
            "name_caracteristic": "type",
            "values_caracteristic": [
              "Buso"
            ]
          },
          {
            "id_caracteristic": 2,
            "name_caracteristic": "size",
            "values_caracteristic": [
              "L",
              "M"
            ]
          }
        ],
        "images":["http://res.cloudinary.com/daau4qgbu/image/upload/v1624158899/henrystore_products/qixiexaiwvwjzwt1x50w.png","http://res.cloudinary.com/daau4qgbu/image/upload/v1624159034/henrystore_products/z88fjftxggxwj676jq0d.png"]
      }
    const [basicInfo, setBasicInfo]=useState({
        name:data.name,
        price:data.price,
        description:data.description,
        unit_stock:data.unit_stock,
        henry_coin:data.henry_coin,
        weight:data.weight,
        size:data.size,
        percentage_discount:data.percentage_discount,
    }) 
    const onChange = (e)=>{
        setBasicInfo({...basicInfo, [e.target.name]:e.target.value})
    }  
    return(
        <div className='editProductContainer'>
            <CreateProduct editIsActive={true} productData={data}/>
        </div>
        
    )
}


export default EditProduct;