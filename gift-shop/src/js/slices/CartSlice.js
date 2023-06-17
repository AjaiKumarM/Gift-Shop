const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
  name: "cartitems",
  initialState: {
    loading: false,
    success:false,
    isStockAvalible:false,
    error:'',
    cartItems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
    confirmOrderProduct: sessionStorage.getItem("orderproducts")
      ? JSON.parse(sessionStorage.getItem("orderproducts"))
      : [],
    shippinginfo: sessionStorage.getItem("shippinginfo")
      ? JSON.parse(sessionStorage.getItem("shippinginfo"))
      : {},
  },
  reducers: {
    AddConfirmOrderProduct(state, action) {
      const items = action.payload;
      return {
        ...state,
        confirmOrderProduct: items,
      };
    },
    AddShippingInfodetaills(state, action) {
      const details = action.payload;
      return {
        ...state,
        shippinginfo: details,
      };
    },

    AddCartRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    AddCartSuccess(state, action) {
      const items = action.payload;
      const isExisted = state.cartItems.find(
        (i) => i.productId === items.productId
      );

      if (isExisted) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          cartItems: [...state.cartItems, items],
          loading: false,
        };
        localStorage.setItem("cartitems", JSON.stringify(state.cartItems));
      }
      return state;
    },
    RemoveCartProduct(state, action) {
      const itemid = action.payload;
      const filterProduct = state.cartItems.filter(
        (item) => item.productId !== itemid
      );

      if (filterProduct.length === 0) {
        state = {
          cartItems: [],
        };
        localStorage.removeItem("cartitems");
      } else {
        state = {
          cartItems: filterProduct,
        };
        localStorage.setItem("cartitems", JSON.stringify(state.cartItems));
      }

      return state;
    },
    CartIncreaseQunatity(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });

      localStorage.setItem("cartitems", JSON.stringify(state.cartItems));
      return state;
    },
    CartDecreaseQunatity(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });

      localStorage.setItem("cartitems", JSON.stringify(state.cartItems));

      return state;
    },
    ClearConfirmOrderSlice(state,action){
      return{
        ...state,
        confirmOrderProduct:[],
      }
    },
    isStockAvailbleRequest(state,action){
      return{
        ...state,
        loading:true,
      }
    },
    IsStockIsAvalibleSuccess(state,action){
      return{
        ...state,
        loading:false,
        isStockAvalible:action.payload.success
      }
    },
    IsStockIsAvalibleFail(state,action){
      return{
        ...state,
        loading:false,
        isStockAvalible:false,
        error:action.payload
      }
    },
    ClearStockAndError(state,action){
      return{
        ...state,
        loading:false,
        isStockAvailbleRequest:false,
        error:null
      }
    },
    ClearCartError(state,action){
      return{
        ...state,
        error:null
      }
    },
    AddShippingInfoRequest(state,action){
      return{
        ...state,
        loading:true,
      }
    },
    AddShippingInfoSuccess(state,action){
      return{
        ...state,
        loading:false,
        success:true
      }
    },
    AddShippingInfoFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    DeleteShippingInfoRequest(state,action){
      return{
        ...state,
        loading:true,
      }
    },
    DeleteShippingInfoSuccess(state,action){
      return{
        ...state,
        loading:false,
        success:true,
      }
    },
    DeleteShippingInfoFail(state,action){
      return{
        ...state,
        loading:false,
      }
    },
    ClearSuccessCart(state,action){
      return{
        ...state,
        success:false
      }
    }
  },
});

const { actions, reducer } = CartSlice;

export const {
  AddCartRequest,
  AddCartSuccess,
  RemoveCartProduct,
  CartDecreaseQunatity,
  CartIncreaseQunatity,
  AddConfirmOrderProduct,
  AddShippingInfodetaills,
  ClearConfirmOrderSlice,
  isStockAvailbleRequest,
  IsStockIsAvalibleFail,
  IsStockIsAvalibleSuccess,
  ClearStockAndError,
  AddShippingInfoFail,
  AddShippingInfoRequest,
  AddShippingInfoSuccess,
  ClearCartError,
  DeleteShippingInfoRequest,
  DeleteShippingInfoSuccess,
  DeleteShippingInfoFail,
  ClearSuccessCart
} = actions;

export default reducer;
