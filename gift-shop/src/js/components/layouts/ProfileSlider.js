import { Fragment,  useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserLogoutAction } from "../../actions/AuthenticationAction";
import { Link, useNavigate } from "react-router-dom";





export default function ProfileSilder({order}){

    const [change ,setChange] = useState(false);

    const {userProfile,userChangePass,userChangeOrder} = useSelector((state)=>state.NavbarState)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <Fragment>
            <div className="profile-slider">
                <ul className="profile-slider-list">
                    <Link to={'/user/profile'} className={`profile-slider-item display-flex gap-2 ${userProfile ?"profile-slider-active":''}`} ><i className="fi fi-ss-user pt-1"></i><span>Profile</span></Link>
                    <Link to={'/user/orders'} className={`profile-slider-item display-flex gap-2 ${userChangeOrder ?"profile-slider-active":''}`}  ><i className="fi fi-bs-luggage-cart pt-1"></i><span>Orders</span></Link>
                    <Link to={'/user/change/password'} className={`profile-slider-item display-flex gap-2 ${userChangePass ?"profile-slider-active":''}`} ><i className="fi fi-br-lock pt-1"></i><span>Change Password</span></Link>
                    <Link  className={`profile-slider-item display-flex gap-2 ${change ?"profile-slider-active":''}`} onClick={()=> {setChange(true)}}><i className="fi fi-br-sign-out-alt pt-1"></i><span>Logout</span></Link>
                </ul>
            </div>
            <Modal size="md" backdrop='static' centered show={change}>
                <Modal.Body>
                    <div className="logout">
                    <div className="logout-content">
                        <p>Are you sure,<br />You want to logout?</p>
                    </div>
                    <div className="display-flex gap-3 pt-2">
                        <button onClick={()=>setChange(false)} className="btn-sc-primary-outline rounded-pill">Cancel</button>
                        <button onClick={()=>{dispatch(UserLogoutAction);navigate('/')}} className="btn-sc-primary rounded-pill">Logout</button>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )

}