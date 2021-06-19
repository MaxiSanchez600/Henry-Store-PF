// ! MODULES
import {
  allProductsFilteredService,
  getAllCategoriesService,
  getCaracteristicsService,
  addProductToCartService
} from "../services/products.service";
// import { getAllCategoriesService } from "../services/categories.service";

// ! URLS 
// import { PRODUCTS_URL } from '../../Config/index';

// ! names_Actions
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CARACTERISTICS = "GET_CARACTERISTICS";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

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
        // console.log("response: ", response);
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
// =======================================================================================

