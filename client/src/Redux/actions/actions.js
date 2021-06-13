// ! MODULES
// import axios from "axios";
import { allProductsFilteredService } from "../services/products.service";

// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

/* ============================== ACTIONS ============================================== */
// ! GET LIST PRODUCTS WITH FILTERS // ***** DONT USED
export function getAllFilteredProducts(allQueries) {

  return function (dispatch) {
    return allProductsFilteredService(allQueries)
      .then((response) => {
        console.log("response: ", response);
        dispatch({
          type: FILTER_PRODUCTS,
          payload: response.data,
        });
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
//           payload: res..data,
//           queries: res.queries
//         })
//       })
//   }
// }

// =======================================================================================
