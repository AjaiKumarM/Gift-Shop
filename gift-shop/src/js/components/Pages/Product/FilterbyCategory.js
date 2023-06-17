import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../layouts/MetaData";
import Loader from "../../layouts/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ClearNavToggler } from "../../../slices/NavbarSlices";
import { AllProductsAction } from "../../../actions/ProductActions";

export default function FilterByCategory() {
  const { loading, products = [] } = useSelector((state) => state.ProductState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    dispatch(ClearNavToggler());
    dispatch(AllProductsAction(null, null, null, category));
  }, [dispatch, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Filter Results"} />
          <div className="searchproduct container">
            <div className="searchproduct-heading">
              <h2 className="text-blue">{category}</h2>
            </div>
            <div className="product">
              <div className="row">
                {products.length > 0 ? (
                  <Fragment>
                    {products.map((product) => {
                      return (
                        <div
                          key={product._id}
                          className="single-product col-8 col-sm-6 col-lg-3"
                        >
                          <div
                            onClick={() =>
                              navigate(`/single/product/${product._id}`)
                            }
                            className="row"
                          >
                            <div className="col-12 single-product-img ps-lg-2">
                              <img
                                className="img-fluid"
                                src={product.images[0].image}
                                alt={product.name}
                              />
                            </div>
                            <div className="col-12">
                              <span>{product.category}</span>
                            </div>
                            <div className="col-12">
                              <h5>{product.name}</h5>
                            </div>
                            <div className="col-12 star-rating">
                              <div className="display-flex gap-1">
                                <i
                                  className={`fi fi-${
                                    product.rating >= 1 ? "sr-star" : "rr-star"
                                  }`}
                                ></i>
                                <i
                                  className={`fi fi-${
                                    product.rating >= 2 ? "sr-star" : "rr-star"
                                  }`}
                                ></i>
                                <i
                                  className={`fi fi-${
                                    product.rating >= 3 ? "sr-star" : "rr-star"
                                  }`}
                                ></i>
                                <i
                                  className={`fi fi-${
                                    product.rating >= 4 ? "sr-star" : "rr-star"
                                  }`}
                                ></i>
                                <i
                                  className={`fi fi-${
                                    product.rating === 5 ? "sr-star" : "rr-star"
                                  }`}
                                ></i>
                              </div>
                              <div>
                                <p className="rewiew-para">
                                  ({product.numOfReviews} Reviews)
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <p>{`$${product.price}`}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                ) : (
                  <Fragment>
                    <Fragment>
                      <div className="product-not">
                        <div className="product-not-img mt-5">
                          <img
                            src="/images/nodata.jpg"
                            alt="internal"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </Fragment>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
