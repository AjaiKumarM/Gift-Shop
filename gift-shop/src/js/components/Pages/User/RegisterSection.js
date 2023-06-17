import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MetaData";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction, VerifyEmailAction } from "../../../actions/AuthenticationAction";
import { ClearNavToggler, ClearToastShow, ToastDangerShowChange, ToastSuccessShowChange, UserMenuChange } from "../../../slices/NavbarSlices";
import { ClearAuthErrorMessage } from "../../../slices/AuthenticationSlice";





export default function RegisterSection (){

    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [confPassword,SetConPassword] = useState('');
    const [otp,Setotp] = useState();

    const {loading , isAuthentication,error,EmailSend} = useSelector((state)=> state.AuthState)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const RegisterSubmit = (e)=>{
        e.preventDefault();
        if(!EmailSend){
            if(cpassword !== confPassword){
                dispatch(ToastDangerShowChange('Your entered Password and Confirm password not matched'))
                setTimeout(()=>dispatch(ClearToastShow()),4000)
                setTimeout(()=>dispatch(ClearAuthErrorMessage()),5000)
            }else dispatch(RegisterAction(name,email))
        }else if(EmailSend){
            if(otp.length !== 6){
                dispatch(ToastDangerShowChange('Please Enter valid code'))
                setTimeout(()=>dispatch(ClearToastShow()),4000)
                setTimeout(()=>dispatch(ClearAuthErrorMessage()),5000)
            }else{
                dispatch(VerifyEmailAction(name,email,cpassword,otp))
            }
        }
    }

    const ResendOtp = (e)=>{
        e.preventDefault()
        dispatch(RegisterAction(name,email))
    }

    useEffect(()=>{
        if(EmailSend){
            dispatch(ToastSuccessShowChange('Verification code send to your email id'))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
            document.querySelectorAll(".disable").forEach((dir)=>dir.disabled = true)
        }
    },[EmailSend,dispatch])

    useEffect(()=>{
        dispatch(ClearNavToggler())
        dispatch(UserMenuChange())

        if(error){
            dispatch(ToastDangerShowChange(error))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
            setTimeout(()=>dispatch(ClearAuthErrorMessage()),5000)
        }
        
        if(isAuthentication){
            navigate('/')
            dispatch(ToastSuccessShowChange('Your account created successfully'))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
        }
    },[isAuthentication,navigate,dispatch,error])


    return(
        <Fragment>
            <MetaData title={'Register'} />
            <div className="register container">
                <div className="row">
                    <div className="col-md-6 d-none d-md-flex">
                            <img src="/images/register.jpg" alt="register-illustar" className="img-fluid" />
                    </div>
                    <div className="col-12 mt-5 mt-md-0 display-flex col-md-6">
                        <div className="register-form">
                            <div className="form-head">
                                <h3>Register</h3>
                            </div>
                            <form onSubmit={RegisterSubmit} className="form-container">
                                <input className="form-sc-control disable" value={name} onChange={(e)=>setname(e.target.value)} type="text" required name="name" placeholder="Full Name" />
                                <input className="form-sc-control disable" value={email} onChange={(e)=>setemail(e.target.value)} type="email" required name="email" placeholder="Enter your Email Id"/>
                                <input className="form-sc-control disable" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} type="password" required name="password" placeholder="Create Password" />
                                <input className="form-sc-control disable" value={confPassword} onChange={(e)=>SetConPassword(e.target.value)} type="password" required name="confirmpassword" placeholder="Confirm Password" />
                                <div className={`verfication-code ${EmailSend ? 'verify-show' :''}`}>
                                    <div>
                                    <label className="text-muted" htmlFor="code">Enter Authentication code</label>
                                    <button type="click" disabled={loading} onClick={ResendOtp} className="text-primary">Resend</button>
                                    </div>
                                    <input type="tel" name="code" id="code" value={otp} onChange={(e)=>Setotp(e.target.value)} className="form-sc-control" placeholder="0 0 0 0 0 0" />
                                </div>
                                <button type="submit" id="submit" disabled={loading} className="mt-3 btn-sc-primary rounded-pill display-flex gap-2">{loading ? (<span className='loader3'></span>):(<span>{EmailSend ?"Submit": "Register"}</span>)}</button>
                            </form>
                            <div className="loginnow">
                                <p>Already have an account? <Link to={'/user/Login'}>Login now</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}