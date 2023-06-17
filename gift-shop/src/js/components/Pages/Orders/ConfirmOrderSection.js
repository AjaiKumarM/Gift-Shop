import { Fragment, useEffect } from "react";
import MetaData from "../../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentDetails } from "../../../actions/PaymentAction";
import { ClearNavToggler, ClearToastShow, ToastDangerShowChange } from "../../../slices/NavbarSlices";
import { ClearPaymentError } from "../../../slices/PaymentSlice";
import OrderProgressBar from "../../layouts/OrderProgressBar";

export const ValidateShipping = (shippinginfo,navigate)=>{
  if (
    !shippinginfo.address ||
    !shippinginfo.phoneNo ||
    !shippinginfo.postalCode ||
    !shippinginfo.state ||
    !shippinginfo.district ||
    !shippinginfo.city
  ) {
    navigate('/order/shipping')
  }
}

export default function ConfirmOrderSection() {
  const {confirmOrderProduct=[],shippinginfo={}} = useSelector((state)=>state.CartState)
  const {loading,success,error} = useSelector((state)=>state.PaymentState)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Order totals
  const subtotal = Math.floor(confirmOrderProduct.reduce((acc,item)=>acc + item.quantity * item.price,0))
  const shippingPrice = subtotal > 100 ? 0 : 20; 
  const taxPrice = 0.25
  const totalPrice = Number(subtotal + shippingPrice + taxPrice).toFixed(2)


  //Confirm order function
  const ConfirmOrderFun =()=>{
    dispatch(GetPaymentDetails(Math.round(totalPrice),confirmOrderProduct))
  }
  useEffect(()=>{
    if(success){
      navigate('/order/payment');
      const orderPrice = {
        subtotal,
        shippingPrice,
        taxPrice,
        totalPrice
      }
      sessionStorage.setItem("orderprice",JSON.stringify(orderPrice))
    }
    if(error){
      dispatch(ToastDangerShowChange(error))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      setTimeout(()=>dispatch(ClearPaymentError()),4000)
    }
  },[success,navigate,shippingPrice,subtotal,taxPrice,totalPrice,dispatch,error])
  useEffect(() => {
    dispatch(ClearNavToggler())
    if (confirmOrderProduct.length === 0) {
      navigate("/products");
    }
    ValidateShipping(shippinginfo,navigate)

  }, [confirmOrderProduct, navigate,shippinginfo,dispatch]);

  return (
    <Fragment>
      {confirmOrderProduct.length > 0 ? (
        <Fragment>
          <MetaData title={"Confirm Order"} />
          <div className="cartpage mx-lg-5 mx-3">
            <div className="display-flex">
              <OrderProgressBar address={true} confirm={true} />
            </div>
            <div className="cartpage-body">
              <div className="row">
                <div className="col-12 col-lg-8">
                  {confirmOrderProduct.map((item) => {
                    return (
                      <div
                        key={item.productId}
                        className="ms-2 ms-sm-0 display-flex row mt-3 cart-item pb-3 sc-border"
                      >
                        <div className="col-11 col-sm-4 order-img">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt={item.name}
                          />
                        </div>
                        <div className="col-12 col-sm-7">
                          <div className="col-12 d-flex mt-1">
                            <h6 className="font-bold col-4">product Id:</h6>
                            <span className="font-small">{`#${String(
                              item.productId
                            ).substring(0, 5)}`}</span>
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/single/product/${item.productId}`)
                            }
                            className="col-11 mt-1 d-flex"
                          >
                            <h6 className="col-4 font-bold">Product name:</h6>
                            <span className="font-small">{item.name}</span>
                          </div>
                          <div className="col-11 d-flex mt-1">
                            <h6 className="font-bold col-4">Price:</h6>
                            <span className="font-small">{`$${item.price}`}</span>
                          </div>
                          <div className="col-11 d-flex mt-1">
                            <h6 className="font-bold col-4">Quantity:</h6>
                            <span className="font-small">{`${item.quantity} qty`}</span>
                          </div>
                          <div className="col-11 d-flex mt-1">
                            <h6 className="font-bold col-4">Total price:</h6>
                            <span className="font-small">{`$${item.quantity*item.price}`}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-12 mt-5 mt-lg-0 col-lg-4">
                  <div className="carttotal">
                    <div className="carttotal-heading">
                      <h5>Order Total</h5>
                    </div>
                    <div>
                      <div className="carttotal-subtotal">
                        <p>Subtotal</p>
                        <span>{`$${subtotal}`}</span>
                      </div>
                      <div className="carttotal-subtotal">
                        <p>Delivery Charge</p>
                        {shippingPrice === 0 ? (<span className="text-success">Free Delivery</span>):(<span>{`$${shippingPrice}`}</span>)}
                      </div>
                      <div className="carttotal-subtotal">
                        <p>Tax Price</p>
                        <span>{`$${taxPrice}`}</span>
                      </div>
                      <div className="carttotal-subtotal">
                        <p>Total</p>
                        <span>{`$${totalPrice}`}</span>
                      </div>
                    </div>
                    <div className="carttotal-btn">
                      <button onClick={ConfirmOrderFun} disabled={loading} className="btn-sc-primary gap-2 rounded-pill mt-5 display-flex w-100">
                      {loading?(<span className="loader3"></span>):(<span>Confirm Order</span>) }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="empty-cartpage container">
            <div className="empty-cart-head">
              <h4>Order Summary</h4>
            </div>
            <div className="empty-cart-content">
              <div className="row">
                <div className="col-10 col-md-6">
                  <div className="empty-cart-img">
                    <img
                      src="/images/emptycart.jpg"
                      className="img-fluid"
                      alt="empty cart"
                    />
                  </div>
                </div>
                <div className="col-11 empty-content col-md-6">
                  <div className="text-md-start text-center">
                    <h3>Your order is Empty</h3>
                    <p>Loooks like you haven't added anything to your cart</p>
                    <button
                      onClick={() => navigate("/products")}
                      className="btn-sc-primary px-3 rounded-pill"
                    >
                      Return to Shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
