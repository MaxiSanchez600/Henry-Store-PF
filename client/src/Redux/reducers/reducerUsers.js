// ! ACTIONS
import {
    GET_USER_LOGIN,
    GET_NACIONALITI,
    GET_DOCUMENTS,
    SET_DATAUSERLOGIN
} from '../actions/actionsUsers.js';

const initialStateUsers = {
    user:[],
    dataUSerLogin: {},
    rolUser: {},
    nationalities:[],
    documentTipes:[]
};

 const usersReducer = (state=initialStateUsers,action) => {
    switch (action.type) {
        case GET_USER_LOGIN:
            return {
              ...state,
              dataUSerLogin: action.payload,
            };
        case SET_DATAUSERLOGIN:
            return {
              ...state,
              dataUSerLogin: action.payload,
            };
        case GET_NACIONALITI:
            return {
              ...state,
              nationalities: action.payload,
            };
        case GET_DOCUMENTS:
            return {
              ...state,
              documentTipes: action.payload,
            };        
        default:
            return state;
    }
};

export default usersReducer;