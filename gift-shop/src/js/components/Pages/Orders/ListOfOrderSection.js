import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUserOrder } from "../../../actions/OrderActons";
import Loader from "../../layouts/Loader";
import ProfileSilder from "../../layouts/ProfileSlider";
import MetaData from "../../layouts/MetaData";
import dateFormat from "dateformat";
import {
  ClearNavToggler,
  ClearToastShow,
  ToastDangerShowChange,
  ToastSuccessShowChange,
  UserOrderChange,
} from "../../../slices/NavbarSlices";
import { useNavigate } from "react-router-dom";
import { ClearIsRewiedField } from "../../../slices/ProductSlice";
import { ReviewSubmitAction } from "../../../actions/ProductActions";

export default function ListofOrdersSection() {
  const { loading, orders = [] } = useSelector((state) => state.OrderState);
  const {userdata} = useSelector((state)=>state.AuthState)
  const { loading: load, isReviewed } = useSelector(
    (state) => state.ProductState
  );

  //Setting Rating Filelds
  const [ratings, SetRatings] = useState(0);
  const [comments, SetComments] = useState("");
  const rating = [1, 2, 3, 4, 5];

  //e
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let delivered = [];
  let NotDelivered = [];

  if (orders.length > 0) {
    delivered = orders.filter((order) => order.orderStatus === "Delivered");
    NotDelivered = orders.filter((order) => order.orderStatus !== "Delivered");
  }

  //Review Submiit fuction
  const ReviewSubmitFunction = (productId) => {
    if (ratings === 0) {
      dispatch(ToastDangerShowChange("Please Select Rating"));
      setTimeout(() => dispatch(ClearToastShow()), 4000);
    } else if (comments.length < 10) {
      dispatch(ToastDangerShowChange("Please Enter your comments"));
      setTimeout(() => dispatch(ClearToastShow()), 4000);
    } else {
      dispatch(ReviewSubmitAction(productId,comments,ratings))
    }
  };

  useEffect(() => {
    dispatch(ClearNavToggler());
    dispatch(UserOrderChange());
    dispatch(GetAllUserOrder);

    if(isReviewed){
      dispatch(ToastSuccessShowChange("Review submited successfully"))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      setTimeout(()=>dispatch(ClearIsRewiedField()),4000)
      dispatch(GetAllUserOrder)
    }
  }, [dispatch,isReviewed]);

  return (
    <Fragment>
      <MetaData title={"Orders"} />
      <div className="row bg-light-grey">
        <div className="col-0 col-md-4 col-lg-3">
          <ProfileSilder />
        </div>
        <div className="col-12 col-md-8 col-lg-9 bg-light-grey overflow">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              {orders.length > 0 ? (
                <Fragment>
                  <div className="margin-top display-flex flex-column">
                    <div className="w-100">
                      <h3 className="text-blue text-bold mb-4 ms-3 ms-md-0 text-start">
                        Orders
                      </h3>
                    </div>
                    {orders && (
                      <Fragment>
                        <div className="float-start text-start w-100"></div>
                        {NotDelivered.length > 0 ? (
                          NotDelivered.map((norder) => (
                            <div
                              className="order box-sha-1 mb-4 p-3"
                              key={norder._id}
                            >
                              <div className="order-head sc-border row">
                                <div className="order-id-date col-7 col-sm-8 col-md-8 col-lg-9">
                                  <div className="order-id rounded-pill gap-2 display-flex">
                                    <span className="font-bold">Order</span>
                                    <span className="text-yellow text-uppercase">{`#${String(
                                      norder._id
                                    ).substring(0, 10)}`}</span>
                                  </div>
                                  <div className="order-date d-none text-muted font-small d-lg-flex">
                                    <span>{`Order Placed ${dateFormat(
                                      norder.createdAt,
                                      "ddd, dS mmm'yy"
                                    )}`}</span>
                                  </div>
                                </div>
                                <div className="order-btn col-5 col-sm-4 col-md-4 col-lg-3">
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/user/single/order/${norder._id}`
                                      )
                                    }
                                    className="btn-sc-primary-outline display-flex gap-2 w-100  rounded-pill"
                                  >
                                    <span>View order</span>
                                  </button>
                                </div>
                              </div>
                              <div className="order-content">
                                {norder &&
                                  norder.orderItems.map((item) => (
                                    <Fragment key={item.productId}>
                                      <div className="mt-3 sc-border pb-3">
                                        <div className="row">
                                          <div className="col-4 col-sm-2 pb-3 pb-sm-0">
                                            <img
                                              src={item.image}
                                              className="img-fluid"
                                              alt="Phone"
                                            />
                                          </div>
                                          <div className="col-8 col-sm-4 col-md-3 mt-3 mt-sm-0 font-small d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0">
                                              {item.name}
                                            </p>
                                          </div>
                                          <div className="col-4 col-sm-2 d-flex justify-content-center flex-column ">
                                            <p className="text-muted font-small mb-0">
                                              Status
                                            </p>
                                            <span
                                              className={`${
                                                norder.orderStatus ===
                                                "Delivered"
                                                  ? "text-success"
                                                  : "text-orange"
                                              }`}
                                            >
                                              {norder.orderStatus}
                                            </span>
                                          </div>
                                          <div className="col-4 col-sm-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              Qty: {item.quantity}
                                            </p>
                                          </div>
                                          <div className="col-4 col-sm-1 col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              ${item.price}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Fragment>
                                  ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <Fragment>
                            <div className="empty-order bg-light w-95 py-5 box-sha-1">
                              <div className="empty-order-img">
                                <img
                                  src="/images/search.png"
                                  alt="search"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="empty-order-content">
                                <h4>NO ORDERS FOUND</h4>
                                <p className="text-muted">
                                  Looks like haven'e made your order yet
                                </p>
                              </div>
                            </div>
                          </Fragment>
                        )}
                        {delivered.length > 0 ? (
                          <div className="float-start text-start w-100 mt-5">
                            <h3 className="text-blue text-bold mb-4 text-start ms-3 ms-md-0">
                              Delivered Orders
                            </h3>
                          </div>
                        ) : null}
                        {delivered.length > 0
                          ? delivered.map((dorder) => (
                              <Fragment key={dorder._id}>
                                <div className="order box-sha-1 mb-4 p-3">
                                  <div className="order-head sc-border row">
                                    <div className="order-id-date col-7 col-sm-8 col-md-8 col-lg-9">
                                      <div className="order-id rounded-pill gap-2 display-flex">
                                        <span className="font-bold">Order</span>
                                        <span className="text-yellow text-uppercase">{`#${String(
                                          dorder._id
                                        ).substring(0, 10)}`}</span>
                                      </div>
                                      <div className="order-date d-none text-muted font-small d-lg-flex">
                                        <span>{`Order Placed ${dateFormat(
                                          dorder.createdAt,
                                          "ddd, dS mmm'yy"
                                        )}`}</span>
                                      </div>
                                    </div>
                                    <div className="order-btn col-5 col-sm-4 col-md-4 col-lg-3">
                                      <button
                                        onClick={() =>
                                          navigate(
                                            `/user/single/order/${dorder._id}`
                                          )
                                        }
                                        className="btn-sc-primary-outline display-flex gap-2 w-100  rounded-pill"
                                      >
                                        <span>View order</span>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="order-content">
                                    {dorder &&
                                      dorder.orderItems.map((item) => (
                                        <Fragment key={item.productId._id}>
                                          <div className="mt-3 sc-border pb-3">
                                            <div className="row">
                                              <div className="col-4 col-sm-2 pb-3 pb-sm-0">
                                                <img
                                                  src={item.image}
                                                  className="img-fluid"
                                                  alt="Phone"
                                                />
                                              </div>
                                              <div className="col-8 col-sm-4 col-md-3 mt-3 mt-sm-0 font-small d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0">
                                                  {item.name}
                                                </p>
                                              </div>
                                              <div className="col-4 col-sm-2 d-flex justify-content-center flex-column ">
                                                <p className="text-muted font-small mb-0">
                                                  Status
                                                </p>
                                                <span
                                                  className={`${
                                                    dorder.orderStatus ===
                                                    "Delivered"
                                                      ? "text-success"
                                                      : "text-orange"
                                                  }`}
                                                >
                                                  {dorder.orderStatus}
                                                </span>
                                              </div>
                                              <div className="col-4 col-sm-2 text-center d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0 small">
                                                  Qty: {item.quantity}
                                                </p>
                                              </div>
                                              <div className="col-4 col-sm-1 col-md-2 text-center d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0 small">
                                                  ${item.price}
                                                </p>
                                              </div>
                                            </div>
                                            {item.productId.reviews.find((rew)=>rew.user === userdata._id)
                                            ? (
                                              <Fragment>
                                                <div className="row mt-4">
                                                  <div className="col-10 col-sm-7 col-lg-5">
                                                    <h4 className=" text-blue fw-blod display-flex gap-2"><span>Thanks For your reviews</span><i className="fi fi-sr-grin smile-icon"></i></h4>
                                                  </div>
                                                </div>
                                              </Fragment>
                                            ) : (
                                              <Fragment>
                                              <div className="row mt-4 display-flex">
                                                <div className="col-6 col-sm-4 display-flex gap-3 mb-3">
                                                  {rating.map((rat) => (
                                                    <i
                                                      key={rat}
                                                      onClick={() =>
                                                        SetRatings(rat)
                                                      }
                                                      className={`fi fi-${
                                                        ratings >= rat
                                                          ? "sr-star"
                                                          : "rr-star"
                                                      } ${
                                                        ratings === rat
                                                          ? "star-active"
                                                          : ""
                                                      } font-star-icon`}
                                                    ></i>
                                                  ))}
                                                </div>
                                                <div className="col-6 col-sm-5">
                                                  <textarea
                                                    name="rating"
                                                    id="rating"
                                                    value={comments}
                                                    onChange={(e) =>
                                                      SetComments(
                                                        e.target.value
                                                      )
                                                    }
                                                    rows="1"
                                                    placeholder="Enter your comments..."
                                                    className="form-te-control"
                                                  ></textarea>
                                                </div>
                                                <div className="col-11 col-sm-3">
                                                  <button
                                                    className="btn-sc-primary-outline w-95 mb-sm-4 display-flex gap-2"
                                                    disabled={load}
                                                    onClick={() =>
                                                      ReviewSubmitFunction(
                                                        item.productId._id
                                                      )
                                                    }
                                                  >
                                                    
                                                    {load ? (
                                                      <span className="loader3"></span>
                                                    ) : (<span>Submit</span>)}
                                                  </button>
                                                </div>
                                              </div>
                                            </Fragment>
                                            )}
                                          </div>
                                        </Fragment>
                                      ))}
                                  </div>
                                </div>
                              </Fragment>
                            ))
                          : null}
                      </Fragment>
                    )}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="empty-order height-vh">
                    <div className="empty-order-img">
                      <img
                        src="/images/search.png"
                        alt="search"
                        className="img-fluid"
                      />
                    </div>
                    <div className="empty-order-content">
                      <h4>NO ORDERS FOUND</h4>
                      <p className="text-muted">
                        Looks like haven'e made your order yet
                      </p>
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
