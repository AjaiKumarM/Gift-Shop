import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthentication: false,
    loading: false,
    isLoading:true,
    userdata: {},
    success:false,
    EmailSend:false,
    error:'',
  },
  reducers: {
    RegisterRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    RegisterSuccess(state, action) {
      return {
        ...state,
        loading: false,
        EmailSend:true
      };
    },
    RegisterFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    VerifyEmailRequets(state,action){
      return{
        ...state,
        loading:true,
      }
    },
    VerifyEmailSuccess(state,action){
      return{
        ...state,
        loading:false,
        userdata:action.payload.user,
        isAuthentication:true
      }
    },
    VerifyEmailFail(state,action){
      return{
        ...state,
        loading:false,
        userdata:{},
        isAuthentication:false,
        error:action.payload
      }
    },
    LoginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    LoginSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthentication: true,
        userdata: action.payload.user,
        success:action.payload.success
      };
    },
    LoginFail(state, action) {
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        error: action.payload,
      };
    },
    UserProfileRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    UserProfileSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthentication: true,
        userdata: action.payload.user,
      };
    },
    UserProfileFail(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthentication: false,
        error: action.payload,
      };
    },
    UserLogoutRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    UserLogoutSuccess(state,action){
        return{
            loading:false,
            isAuthentication:false,
            userdata:{}
        }
    },
    UserLogoutFail(state,action){
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    ChangePasswordRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    ChangePasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        userdata:action.payload.user,
        success:action.payload.success
      }
    },
    ChangePassowrdFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    ClearAuthSuccess(state,action){
      return{
        ...state,
        success:false
      }
    },
    ForgotPasswordRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    ForgotPasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        success:action.payload.success
      }
    },
    ForgotPasswordFail(state,action){
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    },
    ResetPasswordRequest(state,action){
      return{
        ...state,
        loading:true
      }
    },
    ResetPasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        userdata:action.payload.user,
        isAuthentication:true,
        
      }
    },
    ResetPasswordFail(state,action){
      return{
        ...state,
        loading:false,
        isAuthentication:false,
        error:action.payload
      }
    },
    ClearAuthErrorMessage(state,action){
      return{
        ...state,
        error:null
      }
    }
  },
});

const { actions, reducer } = AuthenticationSlice;

export const {
  RegisterFail,
  RegisterRequest,
  RegisterSuccess,
  LoginFail,
  LoginRequest,
  LoginSuccess,
  UserProfileFail,
  UserProfileRequest,
  UserProfileSuccess,
  UserLogoutFail,
  UserLogoutRequest,
  UserLogoutSuccess,
  ChangePassowrdFail,
  ChangePasswordRequest,
  ChangePasswordSuccess,
  ClearAuthSuccess,
  ForgotPasswordFail,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  ResetPasswordFail,
  ResetPasswordRequest,
  ResetPasswordSuccess,
  ClearAuthErrorMessage,
  VerifyEmailFail,
  VerifyEmailRequets,
  VerifyEmailSuccess
} = actions;

export default reducer;
