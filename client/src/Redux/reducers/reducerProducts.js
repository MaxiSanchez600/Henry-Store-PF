// ! ACTIONS
import {
    // GET_PRODUCTS,
    FILTER_PRODUCTS,
    SET_TOTAL_PRICE,
    SET_CARRITO,
} from '../actions/actions';

import {
    GET_CATEGORIES,
    GET_CARACTERISTICS
} from '../actions/actionsProducts'

const initialState = {
    products: [],
    queries: {},
    user_id: "",
    userhc: 150,
    carrito: [],
    price: undefined,
    hc: undefined,
    categories: [],
    caracteristics: [],
    queries: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        // * Receibe all list of products from backend //DONT USED
        // case GET_PRODUCTS:
        //     return {
        //         ...state,
        //         products: action.payload,
        //     };

        // * Recibe all_list with filter
        case FILTER_PRODUCTS:
            return {
                ...state,
                products: [...action.payload.data],
                queries: { ...action.payload.queries }
            }
        case SET_TOTAL_PRICE:
            return{
                ...state,
                price: action.payload.pricetotal,
                hc: action.payload.hctotal
            }
        case SET_CARRITO:
            let total = 0;
            let hc = 0;
            action.payload.map(producto =>{
                total = total + (producto.precio * producto.actual_amount)
                hc = hc + (producto.hc * producto.actual_amount)
            })
            return{
                ...state,
                carrito: action.payload,
                price: total,
                hc: hc,
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...action.payload]
            }
        case GET_CARACTERISTICS:
            // console.log("action: ", action);
            return {
                ...state,
                caracteristics: [...action.payload.data]
            }
        // * default
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;