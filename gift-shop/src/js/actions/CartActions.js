import axios from "axios";
import {
  AddCartRequest,
  AddCartSuccess,
  AddShippingInfoFail,
  AddShippingInfoRequest,
  AddShippingInfoSuccess,
  DeleteShippingInfoFail,
  DeleteShippingInfoRequest,
  DeleteShippingInfoSuccess,
  IsStockIsAvalibleFail,
  IsStockIsAvalibleSuccess,
  isStockAvailbleRequest,
} from "../slices/CartSlice";

export const AddCartAction = (id, qty) => async (dispatch) => {
  try {
    dispatch(AddCartRequest());
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/product/${id}`
    );

    dispatch(
      AddCartSuccess({
        productId: data.product._id,
        name: data.product.name,
        stock: data.product.stock,
        image: data.product.images[0].image,
        quantity: qty,
        price: data.product.price,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

//Stock Available Action
export const StockAvailableAction = (cartItems) => async (dispatch) => {
  try {
    dispatch(isStockAvailbleRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/product/stock`,
      {cartItems},
      { withCredentials: true ,headers: { "Content-Type": "application/json" }}
    );
    dispatch(IsStockIsAvalibleSuccess(data))
  } catch (error) {
    console.log(error)
    if(error.response.data){
        dispatch(IsStockIsAvalibleFail(error.response.data.message))
    }
  }
};

//Add Address Action
export const AddShippingInfoAction = (shippingInfo) =>async (dispatch) =>{

  try {
    dispatch(AddShippingInfoRequest())
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/shipping/details`,{shippingInfo},{withCredentials:true,headers:{"Content-Type": "application/json"}})
    dispatch(AddShippingInfoSuccess())
  } catch (error) {
    console.log(error)
    dispatch(AddShippingInfoFail(error.response.data.message))
  }
}

export const RemoveShippningInfo = (shippingInfo) =>async(dispatch)=>{

  try {
    dispatch(DeleteShippingInfoRequest())
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/shipping/delete`,{shippingInfo},{withCredentials:true,headers:{"Content-Type": "application/json"}})
    dispatch(DeleteShippingInfoSuccess(data))
  } catch (error) {
    console.log(error);
    dispatch(DeleteShippingInfoFail())
    
  }
}