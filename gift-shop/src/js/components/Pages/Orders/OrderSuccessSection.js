import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Loader";
import { useNavigate } from "react-router-dom";
import { ClearPaymentDetails, ClearPaymentVerify } from "../../../slices/PaymentSlice";
import { ClearConfirmOrderSlice } from "../../../slices/CartSlice";
import MetaData from "../../layouts/MetaData";
import OrderProgressBar from "../../layouts/OrderProgressBar";

export default function OrderSuccessSection() {
  const { loading, paymentVerified ,orderId} = useSelector(
    (state) => state.PaymentState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Continue shopping redirect
  const ContinueShopping = ()=>{
    navigate('/products')
    dispatch(ClearPaymentVerify())
  }

  useEffect(()=>{
    if(paymentVerified){
        dispatch(ClearPaymentDetails());
        dispatch(ClearConfirmOrderSlice());
        sessionStorage.removeItem('orderproducts')
        sessionStorage.removeItem('orderprice')
    }
      if(!paymentVerified && !loading){
          navigate('/')
          dispatch(ClearPaymentDetails());
          dispatch(ClearConfirmOrderSlice());
          sessionStorage.removeItem('orderproducts')
          sessionStorage.removeItem('orderprice')
      }
  },[paymentVerified,navigate,loading,dispatch])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Order success'} />
          <div className="container display-vh payment-success">
            <div className="display-flex mb-3">
              <OrderProgressBar address={true} confirm={true} payemnt={true} success={true} />
            </div>
            <div className="payment-success-head">
              <h3>Your order has been received</h3>
            </div>
            <div className="payment-success-check">
              <div className="wrapper">
                {" "}
                <svg
                width={'56px'}
                height={'56px'}
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  {" "}
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />{" "}
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            </div>
            <div className="payment-success-content">
              <h6 className="display-flex gap-2">
                <div>Thanks you for your purchase</div>{" "}
                <i className="fi fi-sr-smile-beam"></i>
              </h6>
              <span>Your order ID is :{orderId ? `#${orderId}`:''}</span>
              <span>
                You will rececive an order confirmation email with details of
                your order
              </span>
            </div>
            <div className="mt-2">
              <button className="btn-sc-primary rounded-pill px-5 py-1" onClick={ContinueShopping}>
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
