// export const PRODUCTS_URL = `https://soyhenry-store.herokuapp.com/products?`;
export const URL_BASE = 'http://localhost:3001/';
const workspace = "http://localhost:3001"
export const PRODUCTS_URL = `http://localhost:3001/product?`;
export const REGISTER_URL="http://localhost:3001/auth/register";
export const LOGIN_URL="http://localhost:3001/auth/login";
export const GUEST_CART_USER = "http://localhost:3001/cart/changecarts"
export const GET_NACIONALITIES="http://localhost:3001/userflow/nacionalities";
export const GET_DOCUMENT_TYPES="http://localhost:3001/userflow/documenttypes";
export const GET_ALL_USERS= `${workspace}/admin/users`
export const CHANGE_ROL= `${workspace}/userflow/users/rol`
export const GET_ROLES= `${workspace}/userflow/role`
export const CATEGORIES_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/categories?`;
export const CARACTERISTICS_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/caracteristics?`;

