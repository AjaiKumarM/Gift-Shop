import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllProductsAction } from "../../../actions/ProductActions";

import {ClearNavToggler, ProductMenuChange} from "../../../slices/NavbarSlices"
import Loader from "../../layouts/Loader";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MetaData";


export default function ProductsSection(){

    const {products=[],loading,productCount,totalCount} = useSelector((state)=> state.ProductState)

    const [pageno,setpageno] = useState(1)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    //Pagenation 
    const pagecount = Math.ceil(totalCount/productCount)

    const ActivePage = (e)=>{
      setpageno(e.selected + 1);
    }

    useEffect(()=>{
      dispatch(ClearNavToggler())
        dispatch(ProductMenuChange())
        dispatch(AllProductsAction(pageno,null,null,null))
    },[dispatch,pageno])
    return(
        <Fragment>
            {loading?<Loader/>:(
              <Fragment>
                <MetaData title={"Products"} />
                <div className="container">
                <div className="product-sec">
                    <div className="product-heading">
                        <h2>Products</h2>
                    </div>
                    <div className="newarrival-product mt-5">
                    <div className="row">
                  {products &&
                    products.map((product)=> {
                      return (
                        <div
                          key={product._id}
                          className="single-product col-8 col-sm-6 col-lg-3"
                        >
                          <div onClick={()=> navigate(`/single/product/${product._id}`)}  className="row">
                            <div className="col-12 single-product-img">
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
                              <i className={`fi fi-${product.rating >= 1 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${product.rating >= 2 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${product.rating >= 3 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${product.rating >= 4 ? "sr-star":"rr-star"}`}></i>
                              <i className={`fi fi-${product.rating === 5 ? "sr-star":"rr-star"}`}></i>
                              </div>
                              <div>
                                <p className="rewiew-para">({product.numOfReviews} Reviews)</p>
                              </div>
                            </div>
                            <div className="col-12">
                              <p>{`$${product.price}`}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                    </div>
                </div>
            </div>
            {totalCount > 3 ? (
              <div className="d-flex my-5 justify-content-center align-item-center">
              <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={pagecount}
              pageRangeDisplayed={productCount}
              renderOnZeroPageCount={0}
              containerClassName="page-container"
              pageClassName="page-no-class rounded-circle"
              activeClassName="page-active"
              previousClassName="page-no-class rounded-circle"
              nextClassName="page-no-class rounded-circle"
              nextLinkClassName="pagination-link"
              previousLinkClassName="pagination-link"
              breakLabel={'...'}
              onPageChange={ActivePage}
              forcePage={pageno - 1}
              />
            </div>
            ):null}

            
              </Fragment>
            )}
        </Fragment>
    )
}