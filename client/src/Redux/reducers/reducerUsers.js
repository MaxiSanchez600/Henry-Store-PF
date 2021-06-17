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
    nationalities:{},
    documentTipes:{}
};

export const usersReducer = (state=initialStateUsers,{type, payload}) => {
    switch (type) {
        case GET_USER_LOGIN:
            return {
              ...state,
              dataUSerLogin: payload,
            };
        case SET_DATAUSERLOGIN:
            return {
              ...state,
              dataUSerLogin: payload,
            };
        case GET_NACIONALITI:
            return {
              ...state,
              nationalities: payload,
            };
        case GET_DOCUMENTS:
            return {
              ...state,
              documentTipes: payload,
            };        
        default:
            return state;
    }
};