import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CartMenuChange,
  FilterMenuChange,
  HomeMenuChange,
  UserMenuChange,
} from "../../slices/NavbarSlices";
import { UserLogoutAction } from "../../actions/AuthenticationAction";
import { Modal } from "react-bootstrap";

export default function BottomNavbar() {
  const { homeMenu, filterMenu, cartMenu, UserMenu ,userProfile,userChangePass ,userChangeOrder} = useSelector(
    (state) => state.NavbarState
  );
  const { isAuthentication } = useSelector((state) => state.AuthState);
  const {cartItems=[]} = useSelector((state)=> state.CartState)

  //LogOut Modal Change
  const [change,setChange] = useState(false)

  //Logout Function
  const LogoutFunction = ()=>{
    dispatch(UserLogoutAction);
    navigate('/');
    setChange(false)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="bottomNav d-block d-md-none">
        <div className="row text-center">
          <div className="col-3 bottomNav-item">
            <Link to="/">
              <i
                onClick={() => dispatch(HomeMenuChange())}
                className={`fi fi-br-house-chimney bottom-icon ${
                  homeMenu ? "bottom-active" : ""
                }`}
              ></i>
            </Link>
          </div>
          <div className="col-3 bottomNav-item">
            <i
              onClick={() => dispatch(FilterMenuChange(true))}
              className={`fi fi-rr-settings-sliders bottom-icon ${
                filterMenu ? "bottom-active" : ""
              }`}
            ></i>
          </div>
          <div className="col-3 bottomNav-item">
            {isAuthentication ? (
              <div className="position-relative">
                <div className="user-profile">
                  <i
                    className={`fi fi-ss-circle-user bottom-icon ${
                      UserMenu ? "bottom-active" : ""
                    }`}
                  ></i>
                  <div id="sc-dropdown">
                    <Link to={'/user/profile'} className={`sc-dropdown-item ${userProfile?"dropdown-active":""}`}>
                      <i className="fi fi-ss-user"></i>
                      <span>Profile</span>
                    </Link>
                    <Link to={'/user/orders'} className={`sc-dropdown-item ${userChangeOrder?"dropdown-active":""}`}>
                      <i className="fi fi-bs-luggage-cart"></i>
                      <span>Orders</span>
                    </Link>
                    <Link to={'/user/change/password'} className={`sc-dropdown-item ${userChangePass?"dropdown-active":""}`}>
                      <i className="fi fi-br-lock pt-1"></i>
                      <span>Change Password</span>
                    </Link>
                    <Link onClick={()=>setChange(true)} className="sc-dropdown-item">
                      <i className="fi fi-br-sign-out-alt"></i>
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link to={"/user/login"}>
                <i
                  onClick={() => dispatch(UserMenuChange())}
                  className={`fi fi-ss-user-add bottom-icon ${
                    UserMenu ? "bottom-active" : ""
                  }`}
                ></i>
              </Link>
            )}
          </div>
          <div className="col-3 bottomNav-item">
            <i
              onClick={() => dispatch(CartMenuChange(true))}
              className={`fi fi-rr-cart-shopping-fast bottom-icon position-relative ${
                cartMenu ? "bottom-active" : ""
              }`}
            >{cartItems.length > 0 ? (<span className="cart-badge">{cartItems.length}</span>):null}</i>
          </div>
        </div>
      </div>
                  <Modal size="md" backdrop='static' centered show={change}>
                  <Modal.Body>
                      <div className="logout">
                      <div className="logout-content">
                          <p>Are you sure,<br />You want to logout?</p>
                      </div>
                      <div className="display-flex gap-3 pt-2">
                          <button onClick={()=>setChange(false)} className="btn-sc-primary-outline rounded-pill">Cancel</button>
                          <button onClick={LogoutFunction} className="btn-sc-primary rounded-pill">Logout</button>
                      </div>
                      </div>
                  </Modal.Body>
              </Modal>
    </Fragment>
  );
}
