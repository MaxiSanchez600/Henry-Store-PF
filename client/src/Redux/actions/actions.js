// ! MODULES
import axios from "axios";

// ! URLS 
import {PRODUCTS_URL} from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';

/* =============== ACTIONS =============== */ 
// ! GET LIST PRODUCTS
export function getProducts() {
  return function (dispatch) {
    return axios.get(PRODUCTS_URL).then((response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    });
  };
}



