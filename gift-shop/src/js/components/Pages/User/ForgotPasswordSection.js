import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordAction } from "../../../actions/AuthenticationAction";
import { useNavigate } from "react-router-dom";
import { ClearAuthSuccess } from "../../../slices/AuthenticationSlice";
import MetaData from "../../layouts/MetaData";
import { ClearNavToggler, ClearToastShow, ToastDangerShowChange, ToastSuccessShowChange, UserMenuChange } from "../../../slices/NavbarSlices";

export default function ForgotPasswordSection() {

    const [email,setEmail] = useState('');

    const {success,loading,error=''} = useSelector((state)=>state.AuthState)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const SentEmail = (e)=>{
        e.preventDefault();
        dispatch(ForgotPasswordAction(email))
    }

    useEffect(()=>{
      dispatch(ClearNavToggler())
      dispatch(UserMenuChange())

      if(error){
        dispatch(ToastDangerShowChange(error))
        setTimeout(()=>dispatch(ClearToastShow()),4000)
      }
      
        if(success){
         navigate("/")   
         dispatch(ClearAuthSuccess())
         dispatch(ToastSuccessShowChange('Mail sent to your mailId'))
         setTimeout(()=>dispatch(ClearToastShow()),4000)
        }
    },[dispatch,navigate,success,error])


  return (
    <Fragment>
      <MetaData title={'Forgot password'} />
      <div className="container">
        <div className="forgotpassword">
          <div className="row">
            <div className="col-12 d-none d-md-flex col-md-6">
              <div className="forgotpassword-img">
                <img src="/images/forgotpass.jpg" className="img-fluid" alt="forgot password" />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-5 mt-md-0 display-flex">
                <div className="forgotpassword-content">
                    <div className="forgotpass-head">
                        <h3>Forgot Password</h3>
                    </div>
                    <form onSubmit={SentEmail}>
                        <div >
                        <label className="mb-2 w-100" htmlFor="email">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="form-sc-control" placeholder="Enter your email id" />
                        </div>

                        <button type="submit" disabled={loading} className="btn-sc-primary rounded-pill display-flex gap-2">{loading?(<span className="loader3"></span>):(<span>Send Mail</span>)}</button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
