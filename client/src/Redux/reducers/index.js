// ! ACTIONS
import {
    // GET_PRODUCTS,
    FILTER_PRODUCTS,
    GET_CATEGORIES
} from '../actions/actions';


const initialState = {
    products: [],
    queries: {},
    categories:{}
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
        
        case GET_CATEGORIES:
            return{
                ...state,
                categories:action.payload
            }

        // * default
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;