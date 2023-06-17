import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    key_id: null,
    success: false,
    paymentVerified: false,
    error:'',
    data: {},
    orderId:''
  },
  reducers: {
    GetPaymentDetailsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    GetPaymentDetailsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        key_id: action.payload.id,
        success: action.payload.success,
        data: action.payload.data,
      };
    },
    GetPaymentDetailsFail(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
        key_id: null,
        success: false,
        data: null,
      };
    },
    ClearPaymentError(state,action){
      return{
        ...state,
        error:null
      }
    },
    ClearPaymentDetails(state, action) {
      return {
        ...state,
        key_id: null,
        success:false,
        data: null,
      };
    },
    ClearPaymentDetailsSuccess(state, action) {
      return {
        ...state,
        success: false,
      };
    },
    PaymentVerifyRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    PaymentVerifySuccess(state, action) {
      return {
        ...state,
        loading: false,
        paymentVerified: action.payload.success,
        orderId:action.payload.orderId
      };
    },
    PaymentVerifyFail(state, action) {
      return {
        ...state,
        loading: false,
        paymentVerified: false,
        error: action.payload,
      };
    },
    ClearPaymentVerify(state,action){
        return{
            paymentVerified:false
        }
    }
  },
});

const { actions, reducer } = PaymentSlice;

export const {
  GetPaymentDetailsFail,
  GetPaymentDetailsRequest,
  GetPaymentDetailsSuccess,
  ClearPaymentDetails,
  ClearPaymentDetailsSuccess,
  PaymentVerifyFail,
  PaymentVerifyRequest,
  PaymentVerifySuccess,
  ClearPaymentVerify,
  ClearPaymentError
} = actions;

export default reducer;
