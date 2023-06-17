import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { SingleOrderAction } from "../../../actions/OrderActons";
import UserOrderTem from "../../layouts/UserOrdertem";
import { ClearNavToggler } from "../../../slices/NavbarSlices";
import dateFormat from "dateformat";
import { ClearOrderError } from "../../../slices/OrderSlice";

export default function SingleOrderSection() {
  const { loading, singleOrder, error } = useSelector(
    (state) => state.OrderState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      navigate("user/orders");
      dispatch(ClearOrderError());
    }
    dispatch(ClearNavToggler());
    dispatch(SingleOrderAction(id));
  }, [dispatch, id, error, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {singleOrder.user && (
            <Fragment>
              <section className="h-100 gradient-custom mt-5 pt-4">
                <div className="container py-5 h-100">
                  <div className="order-head">
                    <h3 className="text-blue font-bold mb-5">Order Summary</h3>
                  </div>
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-11 col-xl-11">
                      <div className="card" style={{ borderRadius: "10px" }}>
                        <div className="card-header px-4 py-5 d-flex gap-2 justify-content-between align-items-center">
                          <h5 className="text-muted mb-0 ">
                            Thanks for your Order,{" "}
                            <span style={{ color: "#a8729a" }}>
                              {singleOrder.user.name}
                            </span>
                            !
                          </h5>
                          {singleOrder.orderStatus.includes('Delivered') ? (<span className="bg-light-green text-dark-green text-up px-4 rounded-pill py-2">{singleOrder.orderStatus}</span>):null}
                        </div>
                        <div className="card-body p-4">
                          <div className="d-flex row justify-content-between align-items-center mb-4">
                            <p
                              className="col-10 col-sm-5 col-md-6 col-lg-8 lead fw-normal mb-0"
                              style={{ color: "#5a5680fa" }}
                            >
                              Order items
                            </p>
                            <div className="col-10 mt-3 mt-sm-0 col-sm-7 col-md-6 col-lg-4 small text-muted mb-0">
                              <div>
                                <span className="font-bold pb-3">
                                  Order id:{" "}
                                </span>{" "}
                                #{String(singleOrder._id).substring(0, 15)}
                              </div>
                              <div>
                                <span className="font-bold pb-3">
                                  Payment id:{" "}
                                </span>{" "}
                                #{singleOrder.paymentId}
                              </div>
                              <div>
                                <span className="font-bold pb-3">
                                  Paid at:{" "}
                                </span>
                                {dateFormat(
                                  singleOrder.paidAt,
                                  "ddd, dS mmm'yy"
                                )}
                              </div>
                            </div>
                          </div>
                          {singleOrder && <UserOrderTem order={singleOrder} />}

                          <div className="d-flex row justify-content-between pt-2">
                            <div className="col-11 col-md-4 single-order-address">
                              <p className="fw-bold pb-2 text-blue">Shipping Details</p>
                              <p className="font-small fw-bold">{singleOrder.shippingInfo.fullName}</p>
                              <p className="text-muted font-small">{`${singleOrder.shippingInfo.address},${singleOrder.shippingInfo.city},`}</p>
                              <p className="text-muted font-small">{`${singleOrder.shippingInfo.district},`}</p>
                              <p className="text-muted font-small">{`${singleOrder.shippingInfo.postalCode},`}</p>
                              <p className="text-muted font-small">{`${singleOrder.shippingInfo.state}`}</p>
                              <p className="font-small pt-1">{`${singleOrder.shippingInfo.phoneNo}`}</p>
                              
                            </div>
                            <div className="col-md-4 single-order-address">
                              <h6 className="fw-bold text-blue pb-3">Paid Amount</h6>
                              <p className="font-small"><span className="fw-bold me-3">Sub total :</span>{`$${singleOrder.itemsPrice}`}</p>
                              <p className="font-small"><span className="fw-bold me-3">Tax Price :</span>{`$${singleOrder.taxPrice}`}</p>
                              <p className="font-small"><span className="fw-bold me-3">Delivery Charge :</span>{singleOrder.shippingPrice === 0 ?(<span className="text-success">Free Delivery</span>):`$${singleOrder.shippingPrice}`}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="card-footer border-0 px-4 py-5"
                          style={{
                            backgroundColor: "#5a5680fa",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        >
                          <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                            Total paid: <span className="h2 mb-0 ms-2">${singleOrder.totalPrice}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
