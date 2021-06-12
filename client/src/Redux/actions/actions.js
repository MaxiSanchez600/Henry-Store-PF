// ! MODULES
import axios from "axios";
import {allProductsFilteredService} from "../services/products.service";

// ! URLS 
import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

/* =============== ACTIONS =============== */
// ! GET LIST PRODUCTS // DONT USED
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

// =======================================================================================
// ! GET LIST PRODUCTS WITH FILTERS // PENDING VERIFY FOR GET PRODUCT ONLY
export function getAllFilteredProducts(allQueries) {
  console.log("LLEGAN QUERIES AL ACTION -> allQueries: ", allQueries);
  return function (dispatch) {
    return allProductsFilteredService(allQueries)
      .then((res) => {
        console.log("VALOR DE RES DEVUELTO POR SERVICE -> : ", res);
        dispatch({
          type: FILTER_PRODUCTS,
          payload: res.data,
          queries: res.queries
        })
      })
  }
}


// =======================================================================================
