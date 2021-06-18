// ! ACTIONS
import {
    // GET_PRODUCTS,
    FILTER_PRODUCTS,
    SET_TOTAL_PRICE,
    SET_CARRITO
} from '../actions/actions';


const initialState = {
    products: [],
    queries: {},
    user_id: "",
    userhc: 150,
    carrito: [],
    price: undefined,
    hc: undefined
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        // * Receibe all list of products from backend //DONT USED
        // case GET_PRODUCTS:
        //     return {
        //         ...state,
        //         products: action.payload,
        //     };

        // * Receibe all_list with filter
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
        // * default
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;