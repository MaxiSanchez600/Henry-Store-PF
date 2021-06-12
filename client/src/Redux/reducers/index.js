// ! ACTIONS
import {GET_PRODUCTS} from '../actions/actions';


const initialState = {
    recipes: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case GET_PRODUCTS:                  // * Receibe all list of products from backend
            return {
                ...state,
                recipes: action.payload,
            };

        default:                            // * default
            return {
                ...state,
            };
    }
};

export default rootReducer;