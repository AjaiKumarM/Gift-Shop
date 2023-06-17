import { configureStore ,combineReducers } from "@reduxjs/toolkit";
import NavbarReducer from "./js/slices/NavbarSlices";
import ProductReducer from "./js/slices/ProductSlice";
import CartReducer from "./js/slices/CartSlice";
import AuthReducer from './js/slices/AuthenticationSlice';
import PaymentReducer from "./js/slices/PaymentSlice"
import thunk from "redux-thunk";
import OrderReducer from "./js/slices/OrderSlice"

const reducer = combineReducers({
    NavbarState:NavbarReducer,
    ProductState:ProductReducer,
    CartState:CartReducer,
    AuthState:AuthReducer,
    PaymentState:PaymentReducer,
    OrderState:OrderReducer
})

let store = configureStore({
    reducer,
    middleware:[thunk],
    devTools:true
})

export default store;