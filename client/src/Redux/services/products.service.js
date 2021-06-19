import axios from "axios";

import {
  PRODUCTS_URL,
  CATEGORIES_URL,
  CARACTERISTICS_URL
} from '../../Config/index';

export async function allProductsFilteredService(allQueries) {
  console.log("allQueries: ", allQueries);
  if (allQueries) {
    const URL_TO_GET_PRODUCTS = PRODUCTS_URL + Object.keys(allQueries).map((query) => `${query}=${allQueries[query]}`).join("&");
    console.log("URL_TO_GET_PRODUCTS: ", URL_TO_GET_PRODUCTS);
    return axios.get(URL_TO_GET_PRODUCTS);
  }
  else return axios.get(PRODUCTS_URL);
}



export async function getAllCategoriesService() {
  return axios.get(CATEGORIES_URL);
}



export async function getCaracteristicsService(query) {
  // console.log("query: ", query);
  if (query) {
    const URL_TO_GET_FILTERS = CARACTERISTICS_URL + Object.keys(query).map((queryName) => `${queryName}=${query[queryName]}`);
    // console.log("URL_TO_GET_FILTERS: ", URL_TO_GET_FILTERS);
    return axios.get(URL_TO_GET_FILTERS);
  }
  else return axios.get(CARACTERISTICS_URL);
  // return axios.get(CARACTERISTICS_URL);
}



export async function addProductToCartService(product) {
  console.log("addProductToCartService -> product: ", product);

  // axios.post("url_to_add_product", product);
}