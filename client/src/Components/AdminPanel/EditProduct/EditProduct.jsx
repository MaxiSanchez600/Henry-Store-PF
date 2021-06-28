import React, { useState, useEffect } from "react";
import CreateProduct from "../CreateProduc/CreateProduct";
import axios from "axios"
import './EditProduct.scss'
import {PRODUCTS_URL} from "../../../Config/index"

function EditProduct ({match, title}){
  const id=match.params.id;
  const [datax, setData]=useState({})

  useEffect(()=>{
    const getDataProduct = async function() {
      try {   
          const response = await axios.get(`${PRODUCTS_URL}id=${+id}`)
          //window.localStorage.setItem('productToEdit', JSON.stringify(response.data.data[0]))
          setData(response.data.data[0])
      }catch (error) {
        console.error(error)
      }   
    };
    getDataProduct()
  },[])

  if(datax.name === undefined) return null
  else{
    return(
      <div className='editProductContainer'>
          <CreateProduct editIsActive={true} productData={datax} title={title}/>
      </div>
    
    )
  }

}


export default EditProduct;