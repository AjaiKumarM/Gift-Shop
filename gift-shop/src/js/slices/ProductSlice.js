import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    newArrival: [],
    topSelling: [],
    products: [],
    singleProduct: {},
    isReviewed:false,
  },
  reducers: {
    HomeProductRequest(state, action) {
      return {
        loading: true,
      };
    },
    HomeProductSuccess(state, action) {
      return {
        loading: false,
        newArrival: action.payload.newProduct,
        topSelling: action.payload.topSelling,
      };
    },
    HomeProductFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    ClearProductErrorField(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    ProductsRequest(state, action) {
      return {
        loading: true,
      };
    },
    ProductsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.count,
        totalCount: action.payload.totalCount,
      };
    },
    ProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    SingleProductRequest(state, action) {
      return {
        loading: true,
      };
    },
    SingleProductSuccess(state, action) {
      return {
        loading: false,
        singleProduct: action.payload.product,
      };
    },
    SingleProductFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    ReviewSubmitRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    ReviewSubmitSuccess(state,action){
      return{
        ...state,
        loading:false,
        isReviewed:action.payload.success
      }
    },
    ReviewSubmitFail(state,action){
      return{
        ...state,
        loading:false,
      }
    },
    ClearIsRewiedField(state,action){
      return{
        ...state,
        isReviewed:false
      }
    }
  },
});

const { actions, reducer } = ProductSlice;

export const {
  HomeProductFail,
  HomeProductRequest,
  HomeProductSuccess,
  ClearProductErrorField,
  ProductsRequest,
  ProductsSuccess,
  ProductsFail,
  SingleProductFail,
  SingleProductRequest,
  SingleProductSuccess,
  ReviewSubmitFail,
  ReviewSubmitRequest,
  ReviewSubmitSuccess,
  ClearIsRewiedField
} = actions;

export default reducer;
