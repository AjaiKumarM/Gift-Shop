import axios from "axios";
import {
  GetPaymentDetailsFail,
  GetPaymentDetailsRequest,
  GetPaymentDetailsSuccess,
  PaymentVerifyFail,
  PaymentVerifyRequest,
  PaymentVerifySuccess,
} from "../slices/PaymentSlice";

export const GetPaymentDetails = (amount,cartItems) => async (dispatch) => {
  try {
    dispatch(GetPaymentDetailsRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/payment/confirmation`,
      { amount,cartItems},
      { withCredentials: true ,headers: { "Content-Type": "application/json" }}
    );
    dispatch(GetPaymentDetailsSuccess(data));
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      dispatch(GetPaymentDetailsFail(error.response.data.message));
    }
  }
};

export const VerifyPaymentAction =
  (
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  ) =>
  async (dispatch) => {


    try {
      dispatch(PaymentVerifyRequest());
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/payment/verify`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          shippingInfo,
          orderItems,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(PaymentVerifySuccess(data));
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        dispatch(PaymentVerifyFail(error.response.data.message));
      }
    }
  };
