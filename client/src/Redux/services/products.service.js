// import axios from "axios";

import PRODUCTS from "../../Assets/products.json";
import {PRODUCTS_URL} from '../../Config/index'

export async function allProductsFilteredService(allQueries) {
  console.log("allQueries desde service: ", allQueries);

  if (allQueries) {
    const URL_TO_GET_PRODUCTS = PRODUCTS_URL + Object.keys(allQueries).map((query) => `${query}=${allQueries[query]}`).join("&");
    console.log("URL PARA HACER GET AL BACK: ", URL_TO_GET_PRODUCTS);
  }

  return {
    data: PRODUCTS,
    queries: allQueries
  };
}