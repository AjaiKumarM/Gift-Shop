import { Fragment, useState } from "react";
import NavMenuSlideBar from "./NavMenuSlideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  CartMenuChange,
  FilterMenuChange,
  UserMenuChange,
  navTogglerChange,
} from "../../slices/NavbarSlices";
import { useNavigate } from "react-router-dom";
import FilterSilder from "./FilterSlider";
import CartSlider from "./CartSliser";

export default function Navbar() {
  const { filterMenu, cartMenu, UserMenu, navToggle } = useSelector(
    (state) => state.NavbarState
  );
  const {cartItems=[]} = useSelector((state)=> state.CartState)
  const { isAuthentication } = useSelector((state) => state.AuthState);

  const [keyword, setKeyWord] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SearchOnSubmitFun = (e) => {
    e.preventDefault();
    navigate(`/product/search/${keyword}`);
    setKeyWord("");
  };

  return (
    <Fragment>
      <div className="navbars px-md-3">
        <div className="row">
          <div className="col-2 col-md-2 pt-3">
            <div
              onClick={() =>
                navToggle
                  ? dispatch(navTogglerChange(false))
                  : dispatch(navTogglerChange(true))
              }
              className={`navbars-toggle ${navToggle ? "active-tog" : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="navbars-search ps-5 ps-md-0 col-6 col-md-3">
            <form onSubmit={SearchOnSubmitFun} className="search-box">
              <input
                required
                type="search"
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                placeholder="search"
                className="search-input rounded-pill"
              />
              <button type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
          <div className="navbars-logo col-2 ps-4 ps-md-4 col-md-1 col-lg-2">
            <div onClick={()=>navigate('/')} className="pointer">
              <h2>Gift</h2>
              <h2>Shop</h2>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 d-none d-md-flex">
            <ul className="navbars-right">
              <li
                className={`navbars-right-itms ${
                  filterMenu ? "right-item-active" : ""
                }`}
                onClick={() => dispatch(FilterMenuChange(true))}
              >
                <i className={`fi fi-rr-settings-sliders`}></i>{" "}
                <span>Filter</span>
              </li>
              {isAuthentication ? (
                <li
                  className={`navbars-right-itms ${
                    UserMenu ? "right-item-active" : ""
                  }`}
                  onClick={() =>{ dispatch(UserMenuChange());navigate('/user/profile')}}
                >
                  <i className={`fi fi-ss-circle-user`}></i> <span>Profile</span>
                </li>
              ) : (
                <li 
                  className={`navbars-right-itms ${
                    UserMenu ? "right-item-active" : ""
                  }`}
                  onClick={() => {dispatch(UserMenuChange());navigate('/user/login')}}
                >
                  <i className={`fi fi-ss-user-add`}></i> <span>Login</span>
                </li>
              )}
              <li
                className={`navbars-right-itms position-relative ${
                  cartMenu ? "right-item-active" : ""
                }`}
                onClick={() => {dispatch(CartMenuChange(true))}}
              >
                <i className={`fi fi-rr-cart-shopping-fast`}></i>{" "}
                <span>Cart</span><span className="cart-badge">{cartItems.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <NavMenuSlideBar navshow={navToggle} />
      <FilterSilder toggler={filterMenu} />
      <CartSlider cart={cartMenu} />
    </Fragment>
  );
}
