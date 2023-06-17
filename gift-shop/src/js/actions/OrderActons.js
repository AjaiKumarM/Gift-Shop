import axios from "axios"
import { OrderFail, OrdersRequest, OrdersSuccess, SingleOrderFail, SingleOrderRequest, SingleOrderSuccess } from "../slices/OrderSlice";




export const GetAllUserOrder = async(dispatch)=>{
    try {
        dispatch(OrdersRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/all/order`,{withCredentials:true})
        dispatch(OrdersSuccess(data))
    } catch (error) {
        console.log(error);

        dispatch(OrderFail())
    }
}

export const SingleOrderAction = (id)=> async (dispatch)=>{
    try {
        dispatch(SingleOrderRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/single/order/${id}`,{withCredentials:true})
        dispatch(SingleOrderSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(SingleOrderFail())
    }
}