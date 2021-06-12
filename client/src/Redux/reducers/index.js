// ! ACTIONS
import { GET_PRODUCTS, FILTER_PRODUCTS } from '../actions/actions';


const initialState = {
    products: [],
    queries: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        // * Receibe all list of products from backend
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        // * Receibe all_list with filter
        case FILTER_PRODUCTS:
            console.log("LLEGA PAYLOAD AL REDUCER: ", action);
            console.log("------------------------------");
            return {
                ...state,
                products: [...action.payload],
                queries: { ...action.queries }
            }

        // * default
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;