import { Fragment, useEffect, useState } from "react";
import { ClearNavToggler, ClearToastShow, ToastDangerShowChange } from "../../../slices/NavbarSlices";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { AddShippingInfodetaills, ClearCartError } from "../../../slices/CartSlice";
import { AddShippingInfoAction, RemoveShippningInfo } from "../../../actions/CartActions";
import { GetUserProfileAction } from "../../../actions/AuthenticationAction";
import OrderProgressBar from "../../layouts/OrderProgressBar";

const query = require("india-pincode-search");

export default function ShippingSection() {

  const {loading,error,success} = useSelector((stat)=>stat.CartState)
  const {userdata} = useSelector((stat)=>stat.AuthState)

  const dispatch = useDispatch();
  const naviagte = useNavigate();

  //Setting New Saved Address Filelds

  const [newAdd,SetNewAdd] = useState(true);
  const [savedAdd,SetSavedAdd] = useState(false);

  //Saved Address filds
  const [SavedAddress,SetSavedAddress] = useState({
    address:'',
    city:'',
    district:'',
    emailId:'',
    fullName:'',
    phoneNo:0,
    postalCode:0,
    state:''
  })

  //Setting Address Feilds
  const [name,SetName] = useState("")
  const [email,SetEmail] = useState("")
  const [address, setAddress] = useState("");
  const [phoneNo, SetPhoneNo] = useState("");
  const [postalCode, SetPostalCode] = useState("");
  const [state, SetState] = useState("");
  const [district, SetDistrict] = useState("");
  const [city, SetCity] = useState("");

  //Set Address field fuction
  const PoastalcodeFun = (e) => {
    if (e.target.value.length >= 6) {
      const fullAddress = query.search(e.target.value);
      if (fullAddress.length > 0) {
        SetState(fullAddress[0].state);
        SetDistrict(fullAddress[0].city);
        SetCity(fullAddress[0].village);
      }
    }
  };

  //Shipping Address Function
  const ShippingAddressFunction = (e) => {
    e.preventDefault();
    const data = { address, phoneNo, postalCode, state, district, city,fullName:name,emailId:email };
    const saveAddress = document.getElementById("saveaddress")
    if(saveAddress.checked){
    dispatch(AddShippingInfoAction(data))
    }
    dispatch(AddShippingInfodetaills(data));
    sessionStorage.setItem("shippinginfo", JSON.stringify(data));
    naviagte("/order/confirm");
  };

  //Radio change function
  const RadioChangeFunction = (info)=>{
    SetSavedAddress({
      address:info.address,
      city:info.city,
      district:info.district,
      emailId:info.emailId,
      fullName:info.fullName,
      phoneNo:info.phoneNo,
      postalCode:info.postalCode,
      state:info.state
    })
  }
  //Saved Address submint function
  const SavedAddressFunction = (e)=>{
    e.preventDefault();
    dispatch(AddShippingInfodetaills(SavedAddress))
    sessionStorage.setItem("shippinginfo",JSON.stringify(SavedAddress))
    naviagte('/order/confirm')
  }

  //Saved Address Delete function 
  const DeleteSavedAddress = (id) =>{
    let shippingInfo = userdata.shippingInfo
   shippingInfo =  shippingInfo.filter(info=>info._id !== id)

   dispatch(RemoveShippningInfo(shippingInfo))
  }

  useEffect(() => {
    dispatch(ClearNavToggler());
    if(error){
      dispatch(ToastDangerShowChange(error))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      setTimeout(()=>dispatch(ClearCartError()),4000)
    }
  }, [dispatch,error]);

  useEffect(()=>{
    console.log(success);
    if(success){
      dispatch(GetUserProfileAction)
    }
  },[success,dispatch])
  return (
    <Fragment>
      <MetaData title={"Shipping Details"} />
      <div className="register">
        <div className="display-flex">
      <OrderProgressBar address={true}/>
        </div>
        <div className="row display-flex">
          <div className="col-12 mt-5 mt-md-0 display-flex col-md-10">
            <div className="shipping-form ">
              <div className="address-selection">
                <div className="address-bac">
                  <span onClick={()=>{SetNewAdd(true);SetSavedAdd(false)}} className={`${newAdd ? "address-active" :''}`}>New</span>
                  <span onClick={()=>{SetNewAdd(false);SetSavedAdd(true)}} className={`${savedAdd ? "address-active" :''}`}>Saved</span>
                </div>
              </div>
              <div className={`${newAdd ? 'show-newaddress' :'hide-newaddress'}`}>
              <div className="form-head">
                <h3>Shipping Address</h3>
              </div>
              <form
                onSubmit={ShippingAddressFunction}
                className="form-container"
              >
                <div className="row ps-5">
                  <div className="col-sm-6">
                    <label htmlFor="name" className="text-start">Full Name <sup className="text-danger">*</sup></label>
                    <input type="text" value={name} onChange={(e)=>SetName(e.target.value)} name="name" id="name" required className="form-sc-control" placeholder="Enter your Full name" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="email" className="text-start">Email id <sup className="text-danger">*</sup></label>
                    <input type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} name="email" id="name" required className="form-sc-control" placeholder="Enter your Email id" />
                  </div>
                <div className="col-sm-6">
                  <label htmlFor="address" className="text-start">
                    Address <sup className="text-danger">*</sup>
                  </label>
                  <textarea name="address" value={address} onChange={(e)=>setAddress(e.target.value)} id="address" cols='30' rows="4" placeholder="Enter Your Address" className="form-sc-control"></textarea>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="phonenumber">
                    Phone Number <sup className="text-danger">*</sup>
                  </label>
                  <input
                    value={phoneNo}
                    min={10}
                    pattern="[0-9]{10}"
                    className="form-sc-control"
                    type="tel"
                    name="phonenumber"
                    placeholder="Enter your Phone Number"
                    onChange={(e) => {
                      SetPhoneNo(e.target.value);
                      if (e.target.value.length > 10) {
                        const slicevalue = e.target.value.slice(0, 10);
                        SetPhoneNo(slicevalue);
                      }
                    }}
                  />

                  <div className="col-sm-6"></div>
                  <label htmlFor="postalcode">
                    Postal code <sup className="text-danger">*</sup>
                  </label>
                  <input
                    value={postalCode}
                    onBlur={PoastalcodeFun}
                    type="tel"
                    pattern="[0-9]{6}"
                    onChange={(e) => {
                      SetPostalCode(e.target.value);
                      if (e.target.value.length > 6) {
                        const slicevalue = e.target.value.slice(0, 6);
                        SetPostalCode(slicevalue);
                      }
                    }}
                    className="form-sc-control"
                    name="postalcode"
                    id="postalcode"
                    placeholder="Enter Postal code"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="state">
                    State <sup className="text-danger">*</sup>
                  </label>
                  <input
                    value={state}
                    onChange={(e) => SetState(e.target.value)}
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter Your state"
                    className="form-sc-control"
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="district">
                    District <sup className="text-danger">*</sup>
                  </label>
                  <input
                    value={district}
                    onChange={(e) => SetDistrict(e.target.value)}
                    type="text"
                    name="district"
                    id="district"
                    placeholder="Enter your district"
                    className="form-sc-control"
                  />
                </div>
                <div className="col-12 w-100">
                  <label htmlFor="city">
                    City <sup className="text-danger">*</sup>
                  </label>
                  <input
                    value={city}
                    onChange={(e) => SetCity(e.target.value)}
                    type="text"
                    name="city"
                    id="city"
                    className="form-sc-control w-95"
                    placeholder="Enter your city"
                    minLength={3}
                    required
                  />
                </div>
                </div>
                <div className="display-flex w-100 gap-2">
                  <input type="checkbox" name="saveaddress" id="saveaddress" className="pointer"/>
                  <label className="pt-2 pointer" htmlFor="saveaddress">
                    Save this Address for future order
                  </label>
                </div>
                <button
                  type="submit"
                  className="my-3 btn-sc-primary rounded-pill display-flex gap-2"
                >
                  <span>CONTIUE</span>
                </button>
              </form>
              </div>
              <div className={`${savedAdd ? 'show-saveadd h-100':'hide-saveadd'}`}>
                <div className="display-flex mt-4 ">
                  <h4 className="fw-bold text-blue ">Saved shipping details</h4>
                </div>
                <form onSubmit={SavedAddressFunction} action="" className="h-100">
                <div className={`mt-5 w-100 h-60 ${userdata.shippingInfo.length > 2 ? "saved-add-con " :''}`}>
                  <div className={`w-100 d-flex justify-content-center flex-column align-items-center `}>
                  {userdata.shippingInfo.length > 0 ? userdata.shippingInfo.map(info=>(
                    <Fragment key={info._id}>
                      <div className={`row w-75 box-sha-2 px-2 pt-3 mb-3 h-auto-sc radius ${loading ? 'loading-event':''}`}>
                        <div className="col-10">
                          <h6 className="text-capitalize fw-bold">{info.fullName}</h6>
                          <div className="text-muted address-info">
                            <p>{`${info.address},${info.city},`}</p>
                            <p>{`${info.district},`}</p>
                            <p>{`${info.state}-${info.postalCode}`}</p>
                          </div>
                          <p>{info.phoneNo}</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-between align-item-center">
                          <div>
                          <input type="radio" name="save-address" id="save-address" onClick={()=>RadioChangeFunction(info)} className="pointer"  required/>
                          </div>
                          <div className="pointer">
                          <i onClick={()=>DeleteSavedAddress(info._id)} className="fi fi-br-trash text-blue"></i>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )):(<Fragment>
                    <div className="display-flex flex-column">
                      <img src="/images/map-location.png" alt="location" className="img-fluid w-25" />
                      <div className="text-center">
                        <h4 className="mt-3 fw-bold text-center">Result Not Found</h4>
                        <p className="text-muted text-center">Whoops... this information is not available <br /> for a moment</p>
                        <button type="button" className="btn-sc-primary px-4 rounded-pill" onClick={()=>{SetNewAdd(true);SetSavedAdd(false)}}>Go Back</button>
                      </div>
                    </div>
                  </Fragment>)}
                </div>
                  </div>
                  <div className={`${userdata.shippingInfo.length >0 ? "mt-4 display-flex" :"d-none"}`}>
                    <button type="submit" disabled={loading} className="btn-sc-primary rounded-pill w-75 display-flex">{loading ? (<span className="loader3"></span>):(<span>Submit</span>)}</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
