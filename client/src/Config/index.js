// export const PRODUCTS_URL = `https://soyhenry-store.herokuapp.com/products?`;
import axios from 'axios'

export const URL_BASE = 'http://64.227.105.153:3000/';
export const workspace = "http://64.227.105.153:3000";
export const PRODUCTS_URL = `${workspace}/product?`;
export const REGISTER_URL= `${workspace}/auth/register`;
export const LOGIN_URL= `${workspace}/auth/login` ;
export const GUEST_CART_USER = `${workspace}/cart/changecarts`;
export const GET_NACIONALITIES=`${workspace}/userflow/nacionalities`;
export const GET_DOCUMENT_TYPES =`${workspace}/userflow/documenttypes`;
export const GET_ALL_USERS= `${workspace}/admin/users`;
export const CHANGE_ROL= `${workspace}/userflow/users/rol`;
export const CHANGE_STATUS= `${workspace}/userflow/users/status`;
export const BAN_USER= `${workspace}/admin/banuser`;
export const GET_ROLES= `${workspace}/userflow/role`;
export const ADMIN_ORDERS= `${workspace}/admin/orders`;
export const GET_CATEGORIES= `${workspace}/product/categories`;
export const CATEGORIES_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/categories?`;
export const CARACTERISTICS_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/caracteristics?`;
export const PUT_DATA_USER= `${workspace}/auth/login`;
export const GET_STATUS= `${workspace}/userflow/userstatus`;
export const GET_MYORDERS= `${workspace}/userflow/myorders`;  
export const GET_DETAIL_ORDER= `${workspace}/userflow/myorder/detail`;  
export const RESET_PASSWORD= `${workspace}/admin/resetpassword`;
export const ADMIN_EXCHANGES= `${workspace}/admin/exchanges`;
export const ADMIN_HENRYCOIN= `${workspace}/admin/henrycoin`;
export const PROD_SUBCATEGORIES= `${workspace}/product/subcategories`;
export const ADD_USER_ADDRESS = `${workspace}/cart/adduseraddress`;
export const GET_USER_ADDRESS = `${workspace}/cart/getuseraddress`;
export const LOCALIDAD_GET = "https://apis.datos.gob.ar/georef/api/localidades?provincia=";
export const DIRECCION_EDIT = `${workspace}/cart/adduseraddress`;
export const DIRECCION_BY_ID = `${workspace}/cart/getaddressbyid`;
export const UPDATE_DIRECCION = `${workspace}/cart/updateaddress`;
export const GET_PAYMENT_ID = `${workspace}/cart/createpayment`;
export const GET_ORDER = `${workspace}/cart/getorder`;
export const ORDER_TO_PAGADO_RETURN_TOTAL_PRICE = `${workspace}/cart/ordentopagado`;
export const henryExchange = 0.50;
export const DELETE_PRODUCT= `${workspace}/product/delete`;
export const REMOVE_PRODUCT_STOCK = `${workspace}/cart/removeproductstockorder`;
export const henryExchangeRoute = () =>{
    return axios.get(`${workspace}/cart/gethenryexchange`)
    .then(value =>{
        return value.data
    })
}
