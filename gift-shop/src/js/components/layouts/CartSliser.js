import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartMenuChange, ClearToastShow, ToastDangerShowChange } from "../../slices/NavbarSlices";
import { useNavigate } from "react-router-dom";
import {
  CartDecreaseQunatity,
  CartIncreaseQunatity,
  RemoveCartProduct,
} from "../../slices/CartSlice";

export default function CartSlider({ cart }) {
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const { cartItems = [] } = useSelector((state) => state.CartState);

  let subtotal;

  if (cartItems.length > 0) {
    subtotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  const incQunatity = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;

    dispatch(CartIncreaseQunatity(item.productId));
  };
  const decQunatity = (item) => {
    const count = item.quantity;
    if (count === 1) return;

    dispatch(CartDecreaseQunatity(item.productId));
  };

  return (
    <Fragment>
      <div className={`cart-slider ${cart ? "cart-slider-active" : ""}`}>
        <div className="cart-slider-heading">
          <h6>Shopping cart</h6>
          <i
            onClick={() => dispatch(CartMenuChange(false))}
            className="bi bi-x"
          ></i>
        </div>
        <div className="cart-slider-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return (
                <div className="cursor-pointer" key={item.productId}>
                  <div className="row cart-slider-item">
                    <div className="col-4">
                      <div className="cart-img">
                        <img
                          className="img-fluid"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        naviagate(`/single/product/${item.productId}`)
                      }
                      className="col-8"
                    >
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 pt-1">
                      <p>{`$${item.price}`}</p>
                    </div>
                    <div className="col-6">
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
                    </div>
                    <div className="col-2 cart-close">
                      <i
                        onClick={() => {
                          dispatch(RemoveCartProduct(item.productId));
                          dispatch(ToastDangerShowChange('Cart item removed'))
                          setTimeout(()=> dispatch(ClearToastShow()),4000)
                        }}
                        className="bi bi-x"
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart">
              <p>No Product in your cart</p>
            </div>
          )}
        </div>
        <div className="cart-slider-bottom">
          {cartItems.length > 0 ? (
            <Fragment>
              <div className="total-sec">
                <p>Subtotal</p>
                <p>{`$${subtotal}`}</p>
              </div>
              <div className="total-btn">
                <button
                  onClick={() => {
                    naviagate("/product/cart");
                    dispatch(CartMenuChange(false));
                  }}
                  className="btn-sc-primary"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    dispatch(CartMenuChange(false));
                    naviagate("/products");
                  }}
                  className="btn-sc-primary"
                >
                  Continue Shopping
                </button>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}
