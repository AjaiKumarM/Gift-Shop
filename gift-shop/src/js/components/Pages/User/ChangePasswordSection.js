import { Fragment, useEffect, useState } from "react";
import ProfileSilder from "../../layouts/ProfileSlider";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassowrdAction } from "../../../actions/AuthenticationAction";
import { useNavigate } from "react-router-dom";
import { ClearAuthSuccess } from "../../../slices/AuthenticationSlice";
import MetaData from "../../layouts/MetaData";
import { ClearNavToggler, ClearToastShow, ToastSuccessShowChange, UserChangePassMenu } from "../../../slices/NavbarSlices";


export default function ChangePasswordSection() {
  const [oldpass, setoldpass] = useState("");
  const [newpass, Setnewpass] = useState("");

  const { loading, success } = useSelector((state) => state.AuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ClearNavToggler())
    dispatch(UserChangePassMenu());
    if (success) {
      dispatch(ToastSuccessShowChange('Password change successfully'))
      navigate("/user/profile");
      dispatch(ClearAuthSuccess());
      setTimeout(()=>dispatch(ClearToastShow()),4000)
    }
  }, [dispatch, navigate, success]);

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(ChangePassowrdAction(oldpass, newpass));
    setoldpass("");
    Setnewpass("");
  };
  return (
    <Fragment>
      <MetaData title={"Change Password"} />
      <div className="row">
        <div className="col-11 col-md-4">
          <ProfileSilder />
        </div>
        <div className="col-12 col-md-8">
          <div className="changepassword">
            <div className="changepassword-head">
              <h2>Change Password</h2>
            </div>
            <div className="display-flex mt-5">
              <div className="changepassword-content">
                <div>
                  <h4>Change Password</h4>
                </div>
                <form onSubmit={UpdatePasswordSubmit}>
                  <div>
                    <label className="mb-2" htmlFor="oldpassword">
                      Old password
                    </label>
                    <input
                      required
                      value={oldpass}
                      onChange={(e) => setoldpass(e.target.value)}
                      placeholder="Enter your old password"
                      className="form-sc-control"
                      type="password"
                      name="oldpassword"
                      id="oldpassword"
                    />
                  </div>
                  <div>
                    <label className="mb-2" htmlFor="newpassword">
                      New password
                    </label>
                    <input
                      required
                      value={newpass}
                      onChange={(e) => Setnewpass(e.target.value)}
                      placeholder="Enter your new password"
                      className="form-sc-control"
                      type="password"
                      name="newpassword"
                      id="newpassword"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-sc-primary display-flex gap-3 rounded-pill mt-3"
                  >
                    
                    {loading ? <span className="loader3"></span> : (<span>Update Password</span>)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
