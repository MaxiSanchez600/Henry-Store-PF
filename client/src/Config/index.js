// export const PRODUCTS_URL = `https://soyhenry-store.herokuapp.com/products?`;
export const PRODUCTS_URL = `http://localhost:3001/product?`;
export const CATEGORIES_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/categories?`;
export const CARACTERISTICS_URL = `${PRODUCTS_URL.slice(0, PRODUCTS_URL.length - 1)}/caracteristics?`;
export const REGISTER_URL = "http://localhost:3001/auth/register";
export const LOGIN_URL = "http://localhost:3001/auth/login";
export const GET_NACIONALITIES = "http://localhost:3001/userflow/nacionalities";
export const GET_DOCUMENT_TYPES = "http://localhost:3001/userflow/documenttypes";

