// IMPORTS DE LOS NOMBRES DE LAS ACTIONS
import {
    FILTER_PRODUCTS
} from "../actions/type_names";

const initialState = {
    products: [],
    queries: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        // case GET_ALL_PRODUCTS:
        //     return {
        //         ...state,
        //         products: [...action.payload]
        //     }
        case FILTER_PRODUCTS:
            console.log("LLEGA PAYLOAD AL REDUCER: ", action);
            console.log("------------------------------");
            return {
                ...state,
                products: [...action.payload],
                queries: {...action.queries}
            }
        default:
            return state;
    }
}

export default rootReducer;