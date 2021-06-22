import axios from "axios"
import { allProductsFilteredService, getAllCategoriesService, getCaracteristicsService, addProductToCartService } from "../services/products.service";
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CARACTERISTICS = "GET_CARACTERISTICS";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const SET_CARRITO = 'SET_CARRITO'
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
export const POST_PRODUCT = 'POST_PRODUCT';
export const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';
export const GET_CURRENCY = 'GET_CURRENCY';

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

export function getAllCategories() {
  return function (dispatch) {
    return getAllCategoriesService()
      .then((response) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data,
        });
      });
  };
}

export function getAllCaracteristics(query) {
  return function (dispatch) {
    return getCaracteristicsService(query)
      .then((response) => {
        dispatch({
          type: GET_CARACTERISTICS,
          payload: response.data,
        });
      });
  };
}

export function addProductToCart(product) {
  return function (dispatch) {
    return addProductToCartService(product)
      // .then((response) => {
      //   dispatch({
      //     type: ADD_PRODUCT_TO_CART,
      //     payload: response.data,
      //   });
      // });
  }
}
export function setCarrito(payload){
  return function (dispatch){
    dispatch({
      type: SET_CARRITO,
      payload: payload
    })
  }
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

export function setCurrencyStore (payload){
  return function(dispatch){
    dispatch({
      type: GET_CURRENCY,
      payload: payload
    })
  }
}

//SI NO USA NADIE ESTA ACTION BORRARLA

// export function getOneProduct (id){       
//   return async function(dispatch) {
//       try {   
//         const response =await axios.get("http://localhost:3001/product?id="+id)
//         dispatch({ type: GET_ONE_PRODUCT, payload: response.data });
//       }catch (error) {
//         console.error(error)
//       }   
//   };
// }
// =======================================================================================
