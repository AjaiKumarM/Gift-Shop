import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordAction } from "../../../actions/AuthenticationAction";
import MetaData from "../../layouts/MetaData";
import { ClearToastShow, ToastDangerShowChange, ToastSuccessShowChange } from "../../../slices/NavbarSlices";
import { ClearAuthErrorMessage } from "../../../slices/AuthenticationSlice";

export default function ResetPasswordSection() {

    const {loading,isAuthentication,error} = useSelector((state)=> state.AuthState)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password,SetPassword] = useState('')
    const [ConfirmPassword ,SetConfirmPassword] = useState("");

    const {token} = useParams()

    const ResetPasswordSubmit = (e)=>{
        e.preventDefault();

        dispatch(ResetPasswordAction(password,ConfirmPassword,token))

    }

    useEffect(()=>{

      if(error){
        dispatch(ToastDangerShowChange(error))
        setTimeout(()=>dispatch(ClearToastShow()),4000)
        setTimeout(()=>dispatch(ClearAuthErrorMessage()),5000)
      }

        if(isAuthentication){
            navigate('/')
            dispatch(ToastSuccessShowChange('Password is reset successfully'))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
        }
    },[navigate,isAuthentication,error,dispatch])

  return (
    <Fragment>
      <MetaData title={'Reset Password'} />
      <div className="resetpassword container">
        <div className="row mt-5">
          <div className="col-12 d-none d-md-flex col-md-6">
            <div className="resetpassword-img">
              <img
                src="/images/reset.jpg"
                className="img-fluid"
                alt="resetpassword"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 display-flex mt-5">
            <div className="resetpassword-content">
              <div className="resetpassword-head">
                <h3>Reset Password</h3>
              </div>
              <form onSubmit={ResetPasswordSubmit}>
                <div>
                  <label className="mb-2" htmlFor="newpassword">New password</label>
                  <input value={password} onChange={(e)=>SetPassword(e.target.value)} placeholder="Enter new password" className="form-sc-control" type="password" name="newpassword" id="newpassword" />
                </div>
                <div>
                    <label className="mb-2" htmlFor="confirmpassword">Confirm Password</label>
                    <input value={ConfirmPassword} onChange={(e)=>SetConfirmPassword(e.target.value)} placeholder="Enter confirm password" className="form-sc-control" type="password" name="confirmpassword" id="confirmpassword" />
                </div> 
                <button disabled={loading} className="btn-sc-primary rounded-pill display-flex gap-3" type="submit">{loading?(<span className="loader3"></span>):(<span>Reset password</span>)}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
