// export const PRODUCTS_URL = `https://soyhenry-store.herokuapp.com/products?`;
export const URL_BASE = 'http://localhost:3001/';
const workspace = "http://localhost:3001";
export const PRODUCTS_URL = `${workspace}/product?`;
export const REGISTER_URL= `${workspace}/auth/register`;
export const LOGIN_URL= `${workspace}/auth/login` ;
export const GUEST_CART_USER = `${workspace}/cart/changecarts`;
export const GET_NACIONALITIES=`${workspace}/userflow/nacionalities`;
export const GET_DOCUMENT_TYPES=`${workspace}/userflow/documenttypes`;
export const GET_ALL_USERS= `${workspace}/admin/users`;
export const CHANGE_ROL= `${workspace}/userflow/users/rol`;
export const CHANGE_STATUS= `${workspace}/userflow/users/status`;
export const BAN_USER= `${workspace}/admin/banuser`;
export const GET_ROLES= `${workspace}/userflow/role`;
export const GET_CATEGORIES= `${workspace}/product/categories`;
export const CATEGORIES_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/categories?`;
export const CARACTERISTICS_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/caracteristics?`;
export const PUT_DATA_USER= `${workspace}/auth/login`;
export const GET_STATUS= `${workspace}/userflow/userstatus`;
export const RESET_PASSWORD= `${workspace}/admin/resetpassword`;