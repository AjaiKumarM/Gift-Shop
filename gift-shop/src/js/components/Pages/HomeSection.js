import { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearNavToggler, HomeMenuChange,} from "../../slices/NavbarSlices";
import Loader from "../layouts/Loader";
import { HomeProductAction } from "../../actions/ProductActions";
import { useNavigate } from "react-router-dom";

export default function HomeSection() {
  const {
    loading,
    newArrival = [],
    topSelling = [],
  } = useSelector((state) => state.ProductState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(ClearNavToggler())
    dispatch(HomeMenuChange());
    dispatch(HomeProductAction);
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Home"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="home pt-5 pt-md-5 mt-5">
            {/* head Section start */}
            <section className="home-header p-2">
              <div className="row">
                <div className="col-12 col-md-5 home-header-content">
                  <div>
                    <h1 className="home-header-h1">
                      The Best Way to Make Someone Happy...
                    </h1>
                    <p className="home-header-p">
                      A gift shop is a store primarily selling souvenirs
                      relating to a particular topic or theme. Items sold
                      include kitchenware, toys, T-shirts, postcards and
                      handmade collections.
                    </p>
                    <button onClick={()=>navigate('/products') } className="btn-sc-primary pt-2 pb-1  px-3 display-flex gap-1"><i className="fi fi-rr-gift "></i> <span className="pb-1">Buy Products</span></button>
                  </div>
                </div>
                <div className="col-12 col-md-6 home-header-img">
                  <img
                    className="img-fluid"
                    src="/images/home-section/8609318_5865.jpg"
                    alt="Home section img"
                  />
                </div>
              </div>
            </section>
            {/* head Section End */}

            {/* New Arravel section start */}
            <section className="newarrival pt-3 pt-sm-5 mt-sm-5 mt-md-0 pt-md-0 ">
              <div className="newarrival-heading">
                <h3>New Arrivals</h3>
                <span></span>
              </div>
              <div className="newarrival-product">
                <div className="row">
                  {newArrival &&
                    newArrival.map((arrival) => {
                      return (
                        <div key={arrival._id} className="col-12 col-sm-6 col-lg-3 display-flex">
                          <div
                          
                          className="single-product"
                        >
                          <div onClick={()=>navigate(`/single/product/${arrival._id}`)} className="row">
                            <div className="col-12 single-product-img ps-lg-2">
                              <img
                                className="img-fluid"
                                src={arrival.images[0].image}
                                alt={arrival.name}
                              />
                            </div>
                            <div className="col-12">
                              <span>{arrival.category}</span>
                            </div>
                            <div className="col-12">
                              <h5>{arrival.name}</h5>
                            </div>
                            <div className="col-12 star-rating">
                              <div className="display-flex gap-1">
                              <i className={`fi fi-${arrival.rating >= 1 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${arrival.rating >= 2 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${arrival.rating >= 3 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${arrival.rating >= 4 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${arrival.rating === 5 ? "sr-star":"rr-star"}`}></i>
                              </div>
                              <div>
                                <p className="rewiew-para">({arrival.numOfReviews} Reviews)</p>
                              </div>
                            </div>
                            <div className="col-12">
                              <p>{`$${arrival.price}`}</p>
                            </div>
                          </div>
                        </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
            {/* New Arravel section end */}

            {/* Category Section Start */}
            <section className="category">
              <div className="category-sec">
                <div className="category-header">
                  <div>
                    <h5>Shop by Categories</h5>
                    <span></span>
                  </div>
                </div>
                <div className="category-content">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con" onClick={()=>navigate('/product/filter/category/Toys')}>
                        <img
                        
                          className="img-fluid"
                          src="/images/category/toy.png"
                          alt="toy"
                        />
                        <p>Toys</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con"
                       onClick={()=>navigate('/product/filter/category/Accessories')} >
                        <img
                          className="img-fluid image-rotate"
                          src="/images/category/Accessories.jpg"
                          alt="Accessories"
                        />
                        <p>Accessories</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con" onClick={()=>navigate('/product/filter/category/Clothing')}>
                        <img
                        
                          className="img-fluid"
                          src="/images/category/clothes.png"
                          alt="clothes"
                        />
                        <p>Clothes</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con" onClick={()=>navigate('/product/filter/category/Handbages')}>
                        <img
                        
                          className="img-fluid"
                          src="/images/category/handbag.jpg"
                          alt="handbag"
                        />
                        <p>Handbags</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con" onClick={()=>navigate('/product/filter/category/Wallets')}>
                        <img
                        
                          className="img-fluid"
                          src="/images/category/wallet.png"
                          alt="wallet"
                        />
                        <p>Wallets</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 display-flex">
                      <div className="category-con" onClick={()=>navigate('/product/filter/category/Jewelries')}>
                        <img
                        
                          className="img-fluid"
                          src="/images/category/jewlary.png"
                          alt="jewlary"
                        />
                        <p>Jewliary</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Category Section end */}
            {/* Top Selling section start */}
            <section className="newarrival pt-3 pb-5">
              <div className="newarrival-heading">
                <h3>Top Selling</h3>
                <span></span>
              </div>
              <div className="newarrival-product">
                <div className="row">
                  {topSelling &&
                    topSelling.map((topsel)=> {
                      return (
                        <div
                          key={topsel._id}
                          className="single-product col-8 col-sm-6 col-lg-3"
                        >
                          <div onClick={()=> navigate(`/single/product/${topsel._id}`)} className="row">
                            <div className="col-12 single-product-img">
                              <img
                                className="img-fluid"
                                src={topsel.images[0].image}
                                alt={topsel.name}
                              />
                            </div>
                            <div className="col-12">
                              <span>{topsel.category}</span>
                            </div>
                            <div className="col-12">
                              <h5>{topsel.name}</h5>
                            </div>
                            <div className="col-12 star-rating">
                              <div className="display-flex gap-1">
                              <i className={`fi fi-${topsel.rating >= 1 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${topsel.rating >= 2 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${topsel.rating >= 3 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${topsel.rating >= 4 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${topsel.rating === 5 ? "sr-star":"rr-star"}`}></i>
                              </div>
                              <div>
                                <p className="rewiew-para">({topsel.numOfReviews} Reviews)</p>
                              </div>
                            </div>
                            <div className="col-12">
                              <p>{`$${topsel.price}`}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
            {/* Top Selling section end */}
          </div>
        </div>
      )}
    </Fragment>
  );
}
