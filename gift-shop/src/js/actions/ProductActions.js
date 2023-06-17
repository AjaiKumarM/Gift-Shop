import axios from "axios";
import {
  HomeProductFail,
  HomeProductRequest,
  HomeProductSuccess,
  ProductsFail,
  ProductsRequest,
  ProductsSuccess,
  ReviewSubmitFail,
  ReviewSubmitRequest,
  ReviewSubmitSuccess,
  SingleProductFail,
  SingleProductRequest,
  SingleProductSuccess,
} from "../slices/ProductSlice";
import { Navigate } from "react-router-dom";

//Home Products Section Action
export const HomeProductAction = async (dispatch) => {
  try {
    dispatch(HomeProductRequest());
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/home/product`
    );
    dispatch(HomeProductSuccess(data));
  } catch (error) {
    if(error.message === "Network Error"){
      return <Navigate to={'/server/error'} />
    }
    if (error.response.data) {
      dispatch(HomeProductFail(error.response.data.message));
    }
  }
};

//all Products Section
export const AllProductsAction = (pageno, keyword,price,category) => async (dispatch) => {
  try {
    dispatch(ProductsRequest());

    if (keyword) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/products?keyword=${keyword}`
      );
      dispatch(ProductsSuccess(data));
    }else if(price){
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/products?price[gt]=${price[0]}&price[lt]=${price[1]}`
      );
      dispatch(ProductsSuccess(data));
      
    } else if(category){

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/products?category=${category}`
      );
      dispatch(ProductsSuccess(data));
      
    }
    else {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/products?page=${pageno}`
      );
      dispatch(ProductsSuccess(data));
    }
  } catch (error) {
    console.log(error);

    if (error.response.data) {
      dispatch(ProductsFail(error.response.data.message));
    }
  }
};

//Single Products Action
export const SingleProductAction = (id) => async (dispatch) => {
  try {
    dispatch(SingleProductRequest());
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/product/${id}`
    );
    dispatch(SingleProductSuccess(data));
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      dispatch(SingleProductFail(error.response.data.message));
    }
  }
};

//Review Submit Action
export const ReviewSubmitAction = (productId,comments,rating) => async(dispatch)=>{

  try {
    dispatch(ReviewSubmitRequest())
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/product/review`,{productId,comments,rating},{withCredentials:true,headers:{"Content-Type": "application/json"}})
    dispatch(ReviewSubmitSuccess(data))
  } catch (error) {
    console.log(error);
    dispatch(ReviewSubmitFail())
  }
}
