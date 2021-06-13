import axios from "axios";

// import PRODUCTS from "../../Assets/products.json";
import {PRODUCTS_URL} from '../../Config/index'

/* 
  HASTA QUE NO ESTEN LAS RUTAS:
    - RETORNAR LOS MISMOS PRODUCTOS TANTO EN LINEAS 20 Y 27
  CUANDO YA ESTEN LAS RUTAS:
    - DESCOMENTAR LAS LINEAS 20 Y 27 Y COMENTAR LAS LINEAS 21-24 y 28-31
*/

export async function allProductsFilteredService(allQueries) {
  // console.log("allQueries desde service: ", allQueries);

  if (allQueries) {
    const URL_TO_GET_PRODUCTS = PRODUCTS_URL + Object.keys(allQueries).map((query) => `${query}=${allQueries[query]}`).join("&");
    console.log("URL PARA HACER GET AL BACK: ", URL_TO_GET_PRODUCTS);
    
    return axios.get(URL_TO_GET_PRODUCTS);
    // return {
    //   data: PRODUCTS,
    //   queries: allQueries
    // };
  }
  else {
    return axios.get(PRODUCTS_URL);
    // return {
    //   data: PRODUCTS,
    //   queries: {}
    // };
  }

  
}