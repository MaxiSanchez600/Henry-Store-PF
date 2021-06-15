// ! MODULES
import { allProductsFilteredService } from "../services/products.service";

// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

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

