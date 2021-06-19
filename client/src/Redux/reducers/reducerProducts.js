// ! ACTIONS
import {
    // GET_PRODUCTS,
    FILTER_PRODUCTS,
    GET_CATEGORIES,
    GET_CARACTERISTICS
} from '../actions/actionsProducts';


const initialState = {
    products: [],
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