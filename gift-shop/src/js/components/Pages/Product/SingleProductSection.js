import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { SingleProductAction } from "../../../actions/ProductActions";
import { Carousel } from "react-bootstrap";
import {
  ClearNavToggler,
  ClearToastShow,
  ToastSuccessShowChange,
} from "../../../slices/NavbarSlices";
import MetaData from "../../layouts/MetaData";
import { useState } from "react";
import { AddCartAction } from "../../../actions/CartActions";
import { AddConfirmOrderProduct } from "../../../slices/CartSlice";

export default function SingleProductSection() {
  const { loading, singleProduct = {} } = useSelector(
    (state) => state.ProductState
  );

  const { cartItems = [] } = useSelector((state) => state.CartState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setquantity] = useState(1);

  useEffect(() => {
    dispatch(ClearNavToggler());
    dispatch(SingleProductAction(id));
  }, [dispatch, id, cartItems]);

  //Adding product to cart function
  const AddCartfunction = () => {
    dispatch(AddCartAction(singleProduct._id, quantity));
    dispatch(ToastSuccessShowChange("Product Added to the cart"));
    setTimeout(() => dispatch(ClearToastShow()), 4000);
  };

  //Buy now function
  const BuynowFunction = () => {
    const data = {
      productId: singleProduct._id,
      name: singleProduct.name,
      stock: singleProduct.stock,
      image: singleProduct.images[0].image,
      quantity,
      price: singleProduct.price,
    };
    dispatch(AddConfirmOrderProduct([data]));
    sessionStorage.setItem("orderproducts", JSON.stringify([data]));
    navigate("/user/login?redirect=order/shipping");
  };

  //Increase Product quantity function
  const incQunatity = () => {
    if (singleProduct.stock === 0 || quantity >= singleProduct.stock) {
      return;
    }

    const qty = quantity + 1;
    setquantity(qty);
  };

  //Deceace Product Quantity Function
  const decQunatity = () => {
    if (quantity === 1) return;
    const qty = quantity - 1;
    setquantity(qty);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {singleProduct ? <MetaData title={`${singleProduct.name}`} /> : null}
          <div className="single-product container">
            <div className="row product-center">
              <div className="col-11 col-md-6">
                <div className="product-img">
                  <Carousel>
                    {singleProduct.images &&
                      singleProduct.images.map((image) => {
                        return (
                          <Carousel.Item key={image._id}>
                            <img
                              src={image.image}
                              alt="hello"
                              className="img-fluid"
                            />
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
                </div>
              </div>
              <div className="col-11 col-md-5 mt-5 mt-md-0">
                <div className="product-details">
                  <h3 className="product-details-heading">
                    {singleProduct.name}
                  </h3>
                  <p className="product-details-para">
                    {singleProduct.description}
                  </p>
                  <div className="col-12 star-rating">
                    <div className="display-flex gap-1">
                      <i
                        className={`fi fi-${
                          singleProduct.rating >= 1 ? "sr-star" : "rr-star"
                        }`}
                      ></i>
                      <i
                        className={`fi fi-${
                          singleProduct.rating >= 2 ? "sr-star" : "rr-star"
                        }`}
                      ></i>
                      <i
                        className={`fi fi-${
                          singleProduct.rating >= 3 ? "sr-star" : "rr-star"
                        }`}
                      ></i>
                      <i
                        className={`fi fi-${
                          singleProduct.rating >= 4 ? "sr-star" : "rr-star"
                        }`}
                      ></i>
                      <i
                        className={`fi fi-${
                          singleProduct.rating === 5 ? "sr-star" : "rr-star"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <p className="rewiew-para">
                        ({singleProduct.numOfReviews} Reviews)
                      </p>
                    </div>
                  </div>
                  <h5 className="product-price">{`$${singleProduct.price}`}</h5>
                  <div className="product-add-items ms-sm-5 ms-md-2 ms-lg-5 ms-3 gap-3 gap-lg-5">
                    <div className="inputs">
                      <input
                        name="-"
                        type="button"
                        onClick={decQunatity}
                        value="-"
                      />
                      <input
                        name="quantity"
                        type="number"
                        className="count float-center"
                        readOnly
                        value={quantity}
                      />
                      <input
                        name="+"
                        type="button"
                        onClick={incQunatity}
                        value="+"
                      />
                    </div>
                    <div className="product-stock">
                      {Number(singleProduct.stock) === 0 ? (
                        <p className="text-danger">Out of stock</p>
                      ) : (
                        <p>
                          Only <span>{singleProduct.stock} items </span>Left!{" "}
                          <br /> Don't miss it
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="product-button">
                    <button
                      onClick={BuynowFunction}
                      className="btn-sc-primary"
                      disabled={
                        Number(singleProduct.stock) === 0 ? true : false
                      }
                    >
                      Buy Now
                    </button>
                    {(cartItems.length > 0) &
                    cartItems.some(
                      (item) => item.productId === singleProduct._id
                    ) ? (
                      <button
                        onClick={() => navigate("/product/cart")}
                        className="btn-sc-primary-outline"
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        onClick={AddCartfunction}
                        disabled={
                          Number(singleProduct.stock) === 0 ? true : false
                        }
                        className="btn-sc-primary-outline"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="delivery-detal">
                    <div className="delivery">
                      <div className="delivery-head">
                        <h6 className="d-flex">
                          <i className="fi fi-rs-truck-side"></i>{" "}
                          <span>Free Delivery</span>
                        </h6>
                      </div>
                      <p>Order Above $50 for Free deliver</p>
                    </div>
                    <div className="delivery">
                      <div className="delivery-head">
                        <h6 className="d-flex">
                          <i className="fi fi-rr-undo"></i> <span>Return</span>
                          Delivery
                        </h6>
                      </div>
                      <p>Free 30 days Delivery Returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
              <Fragment>
                <div className="d-flex flex-column d-md-none">
                  <div className="ms-2 mb-3">
                    <h5 className="text-blue fw-bold">Reviews</h5>
                  </div>
                  <div className="review-con">
                    {singleProduct.reviews.map((rev) => (
                      <div className="reviwe-inner-con" key={rev._id}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-capitalize mt-1">{rev.name}</h6>
                          </div>
                          <div className="display-flex gap-1 font-small text-yellow">
                            <i
                              className={`fi fi-${
                                rev.rating >= 1 ? "sr-star" : "rr-star"
                              }`}
                            ></i>
                            <i
                              className={`fi fi-${
                                rev.rating >= 2 ? "sr-star" : "rr-star"
                              }`}
                            ></i>
                            <i
                              className={`fi fi-${
                                rev.rating >= 3 ? "sr-star" : "rr-star"
                              }`}
                            ></i>
                            <i
                              className={`fi fi-${
                                rev.rating >= 4 ? "sr-star" : "rr-star"
                              }`}
                            ></i>
                            <i
                              className={`fi fi-${
                                rev.rating === 5 ? "sr-star" : "rr-star"
                              }`}
                            ></i>
                          </div>
                        </div>
                        <div>
                          <p className="font-small text-muted">{rev.comments}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
