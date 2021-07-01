import { FILTER_PRODUCTS, SET_TOTAL_PRICE, SET_CARRITO,GET_ONE_PRODUCT, GET_ALL_REVIEWS, GET_MY_WISHLIST } from '../actions/actionsProducts';
import { GET_CATEGORIES, GET_CARACTERISTICS, GET_CURRENCY } from '../actions/actionsProducts'

const initialState = {
    products: [],
    product:{},
    user_id: "",
    userhc: 150,
    carrito: [],
    price: undefined,
    hc: undefined,
    categories: [], //en el otro reducer index estaban como un objeto
    caracteristics: [],
    queries: {},
    currency: (localStorage.getItem('currency') !== null) ? localStorage.getItem('currency') : 1,
    currencyname: (localStorage.getItem('currencyname') !== null) ? localStorage.getItem('currencyname') : "USD",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // * Recibe all_list with filter
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
            let hcorder = 0;
            action.payload.forEach(producto =>{
                total = total + (producto.precio * producto.actual_amount)
                hc = hc + (producto.hc * producto.actual_amount)
            })
            return{
                ...state,
                carrito: action.payload,
                price: total,
                hc: hc,
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...action.payload]
            }
        case GET_CARACTERISTICS:
            return {
                ...state,
                caracteristics: [...action.payload.data]
            }
        case GET_ONE_PRODUCT:
        return{
            ...state,
            product:action.payload
        }
        case GET_CURRENCY:
        return{
            ...state,
            currency: action.payload.value,
            currencyname: action.payload.name
        }
        case GET_ALL_REVIEWS:
        return{
            ...state,
            reviews:action.payload
        }
        case GET_MY_WISHLIST:
            return{
                ...state,
                wishlist:action.payload
            }
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;