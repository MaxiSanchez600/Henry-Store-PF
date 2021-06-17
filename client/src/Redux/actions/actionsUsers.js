// ! MODULES
import axios from "axios";
// ! URLS
//import { PRODUCTS_URL, LOGIN_URL, GET_NACIONALITIES, GET_DOCUMENT_TYPES } from "../../Config/index";
import {
  LOGIN_URL,
  GET_NACIONALITIES,
  GET_DOCUMENT_TYPES,
} from "../../Config/index";

// ! names_Actions

export const GET_USER_LOGIN = "GET_USER_LOGIN";
export const GET_NACIONALITI = "GET_NACIONALITI";
export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const SET_DATAUSERLOGIN = "SET_DATAUSERLOGIN";

/* ============================== ACTIONS ============================================== */

export const setUSerLogin =(payload)=>{
  return{
      type:SET_DATAUSERLOGIN,
      payload
  }
}

export function getUserLogin() {
  return function (dispatch) {
    return axios.get(LOGIN_URL).then((response) => {
      dispatch({
        type: GET_USER_LOGIN,
        payload: response.data,
      });
    });
  };
}

export function getNacionalities() {
  return function (dispatch) {
    return axios.get(GET_NACIONALITIES).then((response) => {
      console.log(response);
      dispatch({
        type: GET_NACIONALITI,
        payload: response.data,
      });
    });
  };
}


export function getDocumentTypes() {
  return function (dispatch) {
    return axios.get(GET_DOCUMENT_TYPES).then((response) => {
      console.log(response);
      dispatch({
        type: GET_DOCUMENTS,
        payload: response.data,
      });
    });
  };
}
// =======================================================================================
