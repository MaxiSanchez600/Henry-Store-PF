// ! MODULES
import { allProductsFilteredService } from "../services/products.service";
import axios from "axios"
// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";

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