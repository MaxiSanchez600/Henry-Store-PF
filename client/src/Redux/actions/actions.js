// ! MODULES
import { allProductsFilteredService } from "../services/products.service";
import axios from "axios"
// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
export const SET_CARRITO = 'SET_CARRITO'


export const GET_CATEGORIES = "GET_CATEGORIES";
export const POST_PRODUCT = 'POST_PRODUCT';
export const GET_ONE_PRODUCT='GET_ONE_PRODUCT';
/* ============================== ACTIONS ============================================== */
export function getAllFilteredProducts(allQueries) {
  return function (dispatch) {
    return allProductsFilteredService(allQueries)
      .then((response) => {
        dispatch({
          type: FILTER_PRODUCTS,
          payload: response.data,
        });
      });
  };
}

export function setCarrito(payload){
  return function (dispatch){
    dispatch({
      type: SET_CARRITO,
      payload: payload
    })
  }
}
// =======================================================================================

export function getCategories (){       
  return async function(dispatch) {
      try {   
          const response = await axios.get("http://localhost:3001/product/categories")
          dispatch({ type: GET_CATEGORIES, payload: response.data }); 
      }catch (error) {
        console.error(error)
      }   
  };
}

export function postProduct (payload){       
  return async function() {
      try {   
          await axios.post("http://localhost:3001/product", payload)
          alert('Creado con exito')
      }catch (error) {
        console.error(error)
      }   
  };
}

export function getOneProduct (id){       
  return async function(dispatch) {
      try {   
        const response =await axios.get("http://localhost:3001/product?id="+id)
        dispatch({ type: GET_ONE_PRODUCT, payload: response.data });
      }catch (error) {
        console.error(error)
      }   
  };
}