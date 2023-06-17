import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddConfirmOrderProduct,
  CartDecreaseQunatity,
  CartIncreaseQunatity,
  ClearStockAndError,
  RemoveCartProduct,
} from "../../../slices/CartSlice";
import MetaData from "../../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import {  ClearNavToggler, ClearToastShow, ToastDangerShowChange } from "../../../slices/NavbarSlices";
import { StockAvailableAction } from "../../../actions/CartActions";

export default function CartPageSection() {
  const { cartItems = [],loading,isStockAvalible ,error} = useSelector((state) => state.CartState);

  const [outStock,setOutStock] = useState(false);

  if(cartItems > 0){
    cartItems.forEach((item)=>{
      if(Number(item.stock) === 0){setOutStock(true)}
    })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let carttotal;

  if (cartItems.length > 0) {
    carttotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    carttotal = Math.round(carttotal);
  }

  //Increase Quantity Function
  const incQunatity = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;

    dispatch(CartIncreaseQunatity(item.productId));
  };
  //Decrease Quantity Function
  const decQunatity = (item) => {
    const count = item.quantity;
    if (count === 1) return;

    dispatch(CartDecreaseQunatity(item.productId));
  };

  const CheckOutFunction = ()=>{
    dispatch(StockAvailableAction(cartItems))

  }

  useEffect(() => {
    dispatch(ClearNavToggler());
    if(error){
      dispatch(ToastDangerShowChange(error))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      setTimeout(()=>dispatch(ClearStockAndError()),4000)
    }
    if(isStockAvalible){
      dispatch(AddConfirmOrderProduct(cartItems))
      sessionStorage.setItem('orderproducts',JSON.stringify(cartItems))
      navigate('/user/login?redirect=order/shipping')
      dispatch(ClearStockAndError())
    }
  }, [dispatch,isStockAvalible,cartItems,navigate,error]);

  return (
    <Fragment>
      {cartItems.length > 0 ? (
        <Fragment>
          <MetaData title={"Cart"} />
          <div className="cartpage container">
            <div className="cartpage-header">
              <h2>Cart</h2>
            </div>
            <div className="cartpage-body">
              <div className="row">
                <div className="col-12 col-lg-8 cart-border">
                  {cartItems.map((item) => {
                    return (
                      <div key={item.productId} className="row cart-item pb-3">
                        <div className="col-11 col-md-2 cart-img">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt={item.name}
                          />
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/single/product/${item.productId}`)
                          }
                          className="col-12 col-md-4 mt-1 mt-md-0 vertical-center"
                        >
                          <p className="cart-page-name">{item.name}</p>
                        </div>
                        <div className="col-9 col-md-2 cart-price vertical-center pt-md-3">
                          <p className="text-muted">{`$${item.price}`}</p>
                        </div>
                        <div className="col-5 col-md-1 vertical-center display-flex">
                          {Number(item.stock) === 0 ?(<span className="text-danger">Out of stock</span>):(
                            <div className="inputs">
                            <button onClick={() => decQunatity(item)}>-</button>
                            <input
                              type="number"
                              className="count float-center"
                              readOnly
                              value={item.quantity}
                            />
                            <button onClick={() => incQunatity(item)}>+</button>
                          </div>
                          )}
                        </div>
                        <div className="col-7 col-md-3 vertical-center text-muted display-flex gap-4 gap-md-1 font-1">
                          <div className="subtotal">
                            <span>
                              {`${item.quantity}`}
                              <i className="bi bi-x"></i>
                            </span>{" "}
                            <span>{`${item.quantity * item.price}`}</span>
                          </div>
                          <i
                            onClick={() => {
                              dispatch(RemoveCartProduct(item.productId));
                              dispatch(ToastDangerShowChange('Cart item removed'))
                              setTimeout(()=>dispatch(ClearToastShow()),4000)
                            }}
                            className="bi bi-x close-icon"
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-12 mt-5 mt-lg-0 col-lg-4">
                  <div className="carttotal">
                    <div className="carttotal-heading">
                      <h5>Cart Total</h5>
                    </div>
                    <div>
                      <div className="carttotal-subtotal sc-border">
                        <p>Subtotal</p>
                        <span>{`$${carttotal}`}</span>
                      </div>
                      <div className="carttotal-subtotal sc-border">
                        <p>Total</p>
                        <span>{`$${carttotal}`}</span>
                      </div>
                    </div>
                    <div className="carttotal-btn">
                      <button onClick={CheckOutFunction} disabled={outStock || loading}  className="btn-sc-primary rounded-pill mt-5 display-flex gap-2 w-100">
                        {loading ? (<span className="loader3"></span>):(outStock ?"Check item Instock":(<span>CHECKOUT</span>))}
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
              <h4>Cart</h4>
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
                    <h3>Your Cart is Empty</h3>
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
