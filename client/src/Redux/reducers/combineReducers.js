import { combineReducers } from "redux";
import rootReducer from "./reducerProducts";
import { usersReducer } from "./reducerUsers";

const reducers = combineReducers({
    products: rootReducer,
    users: usersReducer,
})

export default reducers;

