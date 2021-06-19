import { combineReducers } from "redux";
import  rootReducer  from "./index";
import  usersReducer  from "./reducerUsers";

const reducers = combineReducers({
    products: rootReducer,
    users:usersReducer,
})

export default  reducers;

