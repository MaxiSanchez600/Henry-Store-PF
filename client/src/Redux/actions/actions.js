// ! MODULES
import { allProductsFilteredService } from "../services/products.service";

// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
export const SET_CARRITO = 'SET_CARRITO'


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

