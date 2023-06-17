import { Fragment, useEffect } from "react";
import ProfileSilder from "../../layouts/ProfileSlider";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Loader";
import { GetUserProfileAction } from "../../../actions/AuthenticationAction";
import MetaData from "../../layouts/MetaData";
import { ClearNavToggler, UserProfileChange } from "../../../slices/NavbarSlices";
import { useNavigate } from "react-router-dom";

export default function UserProfileSection() {
  const { isLoading, userdata ,isAuthentication} = useSelector(
    (state) => state.AuthState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Joinded;

  if(userdata){
    Joinded = String(userdata.createdAt).substring(0,10)
  }

  useEffect(()=>{
    dispatch(ClearNavToggler())
    dispatch(UserProfileChange())

    if(!isAuthentication){
      dispatch(GetUserProfileAction)
    }
  },[dispatch,isAuthentication])

  return (
    <Fragment>
      <MetaData title={'Profile'} />
      <div className="row">
        <div className="col-12 col-md-4">
          <ProfileSilder />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="col-12 px-5 px-md-0 col-md-8">
              <div className="userprofile">
                <div className="userprofile-head">
                  <h2>Profile</h2>
                </div>
                <div className="display-flex mt-4">
                  <div className="userprofile-content display-flex">
                    <div className="userprofile-img mb-5">
                      <img
                        src="/images/userprofile.png"
                        alt="userprofile"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="userprofile-detail">
                        <h5>Name</h5>
                        <span>{userdata.name}</span>
                    </div>
                    <div className="userprofile-detail">
                        <h5>Email</h5>
                        <span>{userdata.email}</span>
                    </div>
                    <div className="userprofile-detail">
                        <h5>Joinded At</h5>
                        <span>{Joinded}</span>
                    </div>
                    {userdata.role === "admin"?(
                      <Fragment>
                        <div className="userprofile-detail">
                          <button className="btn-sc-primary" onClick={()=>navigate("/admin/dashboard")}>Admin Dashboard</button>
                        </div>
                      </Fragment>
                    ):null}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
