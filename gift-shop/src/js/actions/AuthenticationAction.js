import axios from "axios";
import {
  ChangePassowrdFail,
  ChangePasswordRequest,
  ChangePasswordSuccess,
  ForgotPasswordFail,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  LoginFail,
  LoginRequest,
  LoginSuccess,
  RegisterFail,
  RegisterRequest,
  RegisterSuccess,
  ResetPasswordFail,
  ResetPasswordRequest,
  ResetPasswordSuccess,
  UserLogoutFail,
  UserLogoutRequest,
  UserLogoutSuccess,
  UserProfileFail,
  UserProfileRequest,
  UserProfileSuccess,
  VerifyEmailFail,
  VerifyEmailRequets,
  VerifyEmailSuccess,
} from "../slices/AuthenticationSlice";
import { ClearToastShow, ToastDangerShowChange } from "../slices/NavbarSlices";
import { ClearSuccessCart } from "../slices/CartSlice";

//Register User Section
export const RegisterAction = (name,email) => async (dispatch) => {
  try {
    dispatch(RegisterRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/register`,
      {name,email},
      {
        withCredentials: true
      }
    );
    dispatch(RegisterSuccess(data));
  } catch (error) {
    if (error.response.data) {
      dispatch(RegisterFail(error.response.data.message));
    }
  }
};

//Verify email 

export const VerifyEmailAction = (name,email,password,otp)=>async(dispatch)=>{
  try {
    dispatch(VerifyEmailRequets())
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/verify/email`,{name,email,password,otp},{withCredentials:true})
    dispatch(VerifyEmailSuccess(data))
    
  } catch (error) {
    
    dispatch(VerifyEmailFail(error.response.data.message))
  }
}

//Login User Section
export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
      { email, password },
      { withCredentials: true }
    );
    dispatch(LoginSuccess(data));
  } catch (error) {
    if (error.response.data) {
      dispatch(LoginFail(error.response.data.message));
    }
  }
};

//Get UserProfile section
export const GetUserProfileAction = async (dispatch) => {
  
  try {
    dispatch(UserProfileRequest());
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/profile`,
      { withCredentials: true }
    );
    dispatch(UserProfileSuccess(data));
    dispatch(ClearSuccessCart());
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      dispatch(UserProfileFail());
    }
  }
};

//User Logout Action

export const UserLogoutAction = async (dispatch) => {
  try {
    dispatch(UserLogoutRequest());
    await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    dispatch(UserLogoutSuccess());
    dispatch(ToastDangerShowChange('Logout Successfully!'))
    setTimeout(()=>dispatch(ClearToastShow()),4000)
    console.log('hello');
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      dispatch(UserLogoutFail(error.response.data.message));
    }
  }
};

//User Change Password
export const ChangePassowrdAction =
  (currentPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(ChangePasswordRequest());
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/change/password`,
        { currentPassword, newPassword },
        {
          withCredentials: true
        }
      );
      dispatch(ChangePasswordSuccess(data));
    } catch (error) {
      console.log(error);

      if (error.response.data) {
        dispatch(ChangePassowrdFail(error.response.data.message));
      }
    }
  };

//Forgot Password Action

export const ForgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch(ForgotPasswordRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/forgot/password`,
      { email },
      { withCredentials: true }
    );
    dispatch(ForgotPasswordSuccess(data));
  } catch (error) {
    console.log(error);

    if (error.response.data) {
      dispatch(ForgotPasswordFail(error.response.data.message));
    }
  }
};

//Reset Password Action
export const ResetPasswordAction = (newPassword,confirmPassword, token) => async (dispatch) => {
  try {
    dispatch(ResetPasswordRequest());
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/reset/password/${token}`,
      {newPassword,confirmPassword},
      { withCredentials: true }
    );
    dispatch(ResetPasswordSuccess(data));
  } catch (error) {

    console.log(error);
    if(error.response.data){
      dispatch(ResetPasswordFail(error.response.data.message));
    }

  }
};
