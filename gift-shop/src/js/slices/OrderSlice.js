import { createSlice } from "@reduxjs/toolkit";



const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders:[],
        singleOrder:{},
        loading:true,
        error:''
    },
    reducers:{
        OrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        OrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                orders:action.payload.order
            }
        },
        OrderFail(state,action){
            return{
                ...state,
                loading:false,
                orders:[],
                error:action.payload
            }
        },
        SingleOrderRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        SingleOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                singleOrder:action.payload.order
            }
        },
        SingleOrderFail(state,action){
            return{
                ...state,
                singleOrder:{},
                error:true
            }
        },
        ClearOrderError(state,action){
            return{
                ...state,
                error:false
            }
        }
    }
    
})

const {actions,reducer} = orderSlice;

export const {OrderFail,OrdersRequest,OrdersSuccess,SingleOrderFail,ClearOrderError,SingleOrderRequest,SingleOrderSuccess} = actions;

export default reducer