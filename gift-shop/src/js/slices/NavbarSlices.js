import { createSlice } from "@reduxjs/toolkit";

const NavbarSlice = createSlice({
  name: "navbarSlice",
  initialState: {
    toastSuccessShow:false,
    toastDangerShow:false,
    toasteConetnt:'',
    homeMenu: false,
    productsMenu: false,
    aboutMenu: false,
    contactUsMenu: false,
    cartMenu: false,
    UserMenu: false,
    filterMenu: false,
    navToggle: false,
    userProfile:false,
    userChangePass:false,
    userChangeOrder:false

  },
  reducers: {
    HomeMenuChange(state, action) {
      return {
        ...state,
        homeMenu: true,
      };
    },
    ProductMenuChange(state, action) {
      return {
        ...state,
        productsMenu: true,
      };
    },
    AboutMenuChange(state, action) {
      return {
        ...state,
        aboutMenu: true,
      };
    },
    ContactMenuChange(state, action) {
      return {
        ...state,
        contactUsMenu: true,
      };
    },
    UserMenuChange(state, action) {
      return {
        ...state,
        UserMenu: true,
      };
    },
    CartMenuChange(state, action) {
      return {
        ...state,
        navToggle: false,
        filterMenu: false,
        cartMenu: action.payload,
      };
    },
    FilterMenuChange(state, action) {
      return {
        ...state,
        navToggle: false,
        cartMenu: false,
        filterMenu: action.payload,
      };
    },
    navTogglerChange(state, action) {
      return {
        ...state,
        filterMenu: false,
        cartMenu: false,
        navToggle: action.payload,
      };
    },
    ClearNavToggler(state, action) {
      return {
        ...state,
        homeMenu: false,
        productsMenu: false,
        aboutMenu: false,
        contactUsMenu: false,
        cartMenu: false,
        UserMenu: false,
        filterMenu: false,
        navToggle: false,
        userProfile:false,
        userChangePass:false,
        userChangeOrder:false
      };
    },
    UserProfileChange(state,action){
      return{
        ...state,
        UserMenu:true,
        userProfile:true
      }
    },
    UserChangePassMenu(state,action){
      return{
        ...state,
        UserMenu:true,
        userChangePass:true
      }
    },
    UserOrderChange(state,action){
      return{
        ...state,
        UserMenu:true,
        userChangeOrder:true

      }
    },
    ToastSuccessShowChange(state,action){
      return{
        ...state,
        toastSuccessShow:true,
        toasteConetnt:action.payload
      }

    },
    ToastDangerShowChange(state,action){
      return{
        ...state,
        toastDangerShow:true,
        toasteConetnt:action.payload
      }
    },
    ClearToastShow(state,action){
      return{
        ...state,
        toastSuccessShow:false,
        toastDangerShow:false,
      }
    }
  },
});

const { actions,reducer } = NavbarSlice;

export const {
  HomeMenuChange,
  navTogglerChange,
  AboutMenuChange,
  ContactMenuChange,
  CartMenuChange,
  UserMenuChange,
  ProductMenuChange,
  FilterMenuChange,
  ClearNavToggler,
  UserChangePassMenu,
  UserProfileChange,
  ToastDangerShowChange,
  ToastSuccessShowChange,
  ClearToastShow,
  UserOrderChange
} = actions;

export default reducer;
