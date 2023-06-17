import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ClearNavToggler,
  ClearToastShow,
  ToastDangerShowChange,
} from "../../../slices/NavbarSlices";
import { ClearPaymentDetailsSuccess } from "../../../slices/PaymentSlice";
import { VerifyPaymentAction } from "../../../actions/PaymentAction";
import MetaData from "../../layouts/MetaData";
import OrderProgressBar from "../../layouts/OrderProgressBar";

export default function PaymentSection() {
  const { success, key_id, data } = useSelector((state) => state.PaymentState);
  const { userdata } = useSelector((state) => state.AuthState);
  const { shippinginfo } = useSelector((state) => state.CartState);
  const [popupShow,SetPopupShow] = useState(true)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Create Order Details
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippinginfo"));
  const cartItems = JSON.parse(sessionStorage.getItem("orderproducts"));
  const orderPrice = JSON.parse(
    sessionStorage.getItem("orderprice")
  );

  useEffect(() => {
    dispatch(ClearNavToggler());
  }, [dispatch]);

  useEffect(()=>{
        if (!success) {
         return navigate("/order/confirm");
        }else if(success && popupShow) {
          SetPopupShow(false)
          const options = {
            key: key_id,
            amount: data.amount,
            currency: data.currency,
            name: "Gift Shop",
            description: "for texting purpose",
            order_id: data.id,
            handler: function (response) {
                SetPopupShow(false);
                navigate('/order/payment/success')
              dispatch(
                VerifyPaymentAction(
                  response.razorpay_order_id,
                  response.razorpay_payment_id,
                  response.razorpay_signature,
                  shippingInfo,
                  cartItems,
                  orderPrice.subtotal,
                  orderPrice.taxPrice,
                  orderPrice.shippingPrice,
                  orderPrice.totalPrice
                )
              );
              
    
            },
            prefill: {
              name: userdata.name,
              email: userdata.email,
              contact: shippinginfo.phoneNo,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#484385",
            },
          };
          const rzp1 =new window.Razorpay(options);
          
          if(success && popupShow){
          rzp1.open();
          }
          rzp1.on("payment.failed", function (response) {
            if (response) {
              rzp1.close();
              dispatch(ClearPaymentDetailsSuccess());
              setTimeout(
                () =>
                  dispatch(
                    ToastDangerShowChange("Payment failed Please try again")
                  ),
                3000
              );
              setTimeout(() => dispatch(ClearToastShow()), 7000);
              navigate("/order/confirm");
            }
          });
        }
  },[cartItems,data,dispatch,key_id,navigate,popupShow,shippinginfo,shippingInfo,success,userdata,orderPrice])

  return (
    <Fragment>
      <MetaData title={'Payment gateway'} />
      <div className="display-vh">
        <div className="display-flex margin-top">
        <OrderProgressBar address={true} confirm={true} payemnt={true} />
        </div>
      </div>
    </Fragment>
  );
}
