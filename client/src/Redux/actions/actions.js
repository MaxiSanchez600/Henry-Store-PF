// ! MODULES
import axios from "axios";
import { allProductsFilteredService } from "../services/products.service";

// ! URLS 
import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

/* ============================== ACTIONS ============================================== */
// ! GET LIST PRODUCTS WITH FILTERS // ***** DONT USED
export function getAllFilteredProducts(allQueries) {
  // const URL_TO_GET_PRODUCTS = ""
  if (allQueries) {
    var URL_TO_GET_PRODUCTS = PRODUCTS_URL + Object.keys(allQueries).map((query) => `${query}=${allQueries[query]}`).join("&")
  }
  else {
    var URL_TO_GET_PRODUCTS = PRODUCTS_URL
  }

  return function (dispatch) {
    console.log("hola")
    console.log(URL_TO_GET_PRODUCTS)
    console.log(PRODUCTS_URL)
    return axios.get(URL_TO_GET_PRODUCTS).then((response) => {
      dispatch({
        type: FILTER_PRODUCTS,
        payload: response.data,
        queries: allQueries
      });
    
      console.log(response.data)

    });
  };
}

// =======================================================================================
// ! GET LIST PRODUCTS WITH FILTERS 
// export function getAllFilteredProducts(allQueries) {
//   return function (dispatch) {
//     return allProductsFilteredService(allQueries)
//       .then((res) => {
//         dispatch({
//           type: FILTER_PRODUCTS,
//           payload: res.data,
//           queries: res.queries
//         })
//       })
//   }
// }

// =======================================================================================
