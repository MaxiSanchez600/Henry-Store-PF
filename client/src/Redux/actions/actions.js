//ACA VAN LAS ACTION CREATORS
import {
  FILTER_PRODUCTS,
} from "./type_names";

// MIENTRAS NO ESTE EL BACK PARA PEDIR PRODUCTOS, SE PIDEN DESDE EL JSON
// import PRODUCTS from "../../Assets/products.json";

// IMPORTS DE LOS SERVICIOS
import {
  allProductsFilteredService
} from "../services/products.service";

// export function getAllProducts() {
//   return function (dispatch) {
//     dispatch({
//       type: GET_ALL_PRODUCTS,
//       payload: PRODUCTS
//     })
//   }
// }

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