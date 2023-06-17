import { Fragment, useEffect, useState } from "react";
import MetaData from "../../layouts/MetaData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginAction } from "../../../actions/AuthenticationAction";
import { useDispatch, useSelector } from "react-redux";
import { ClearNavToggler, ClearToastShow, ToastDangerShowChange, ToastSuccessShowChange, UserMenuChange } from "../../../slices/NavbarSlices";
import { ClearAuthErrorMessage, ClearAuthSuccess } from "../../../slices/AuthenticationSlice";






export default function LoginSection(){

    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const {isAuthentication,loading,error,success} = useSelector(state=>state.AuthState)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //Redirect loacation
    const path = location.search ?"/" + location.search.split('=')[1]:'/'
    
    //Login Submit function
    const LoginSubmitFun = (e)=>{
        e.preventDefault();

        dispatch(LoginAction(email,password))
    }

    useEffect(()=>{
        dispatch(ClearNavToggler())
        dispatch(UserMenuChange())

        if(error){
            dispatch(ToastDangerShowChange(error))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
            setTimeout(()=>dispatch(ClearAuthErrorMessage()),4000)
        }

        if(isAuthentication){
            navigate(path)
        }
        if(success){
            dispatch(ToastSuccessShowChange('Login Successfully'));
            setTimeout(()=>{dispatch(ClearToastShow())},4000)
            setTimeout(()=>{dispatch(ClearAuthSuccess())},4000)
        }


    },[dispatch,isAuthentication,navigate,error,path,success])

    return(
        <Fragment>
            <MetaData title={'Login'} />
            <div className="register container">
                <div className="row">
                    
                    <div className="col-12 mt-5 mt-md-0 display-flex col-md-6">
                        <div className="register-form">
                            <div className="form-head">
                                <h3>Login</h3>
                            </div>
                            <form onSubmit={LoginSubmitFun} className="form-container">
                                <input className="form-sc-control" value={email} onChange={(e)=>setemail(e.target.value)} type="email" required name="email" placeholder="Enter your Email Id"/>
                                <input className="form-sc-control" value={password} onChange={(e)=>setpassword(e.target.value)} type="password" required name="password" placeholder="Password" />
                                <div className="forgot-pass">
                                    <Link to={'/forgot/password'}>Forgot Password?</Link>
                                </div>
                                <button type="submit" disabled={loading} className="mt-3 btn-sc-primary rounded-pill display-flex gap-2"> {loading?(<span className="loader3"></span>):(<span>Login</span>)} </button>
                            </form>
                            <div className="loginnow">
                                <p>Not a Member? <Link to={'/user/register'}>Register now</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-none d-md-flex">
                            <img src="/images/login.jpg" alt="register-illustar" className="img-fluid" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}