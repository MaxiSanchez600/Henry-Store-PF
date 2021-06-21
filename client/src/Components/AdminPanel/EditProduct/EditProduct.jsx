import React, { useState, useEffect } from "react";
import CreateProduct from "../CreateProduc/CreateProduct";
import axios from "axios"
import './EditProduct.scss'
import { useSelector, useDispatch } from "react-redux";
import { getOneProduct } from "../../../Redux/actions/actions"; 

function EditProduct ({match, title}){
  const id=match.params.id;
  const [datax, setData]=useState({})

  useEffect(()=>{
    const getDataProduct = async function() {
      try {   
          const response = await axios.get("http://localhost:3001/product?id="+id)
          window.localStorage.setItem('productToEdit', JSON.stringify(response.data.data[0]))
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