import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClearNavToggler } from "../../slices/NavbarSlices";





export default function PageNotFoundSection(){

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(ClearNavToggler())
    },[dispatch])
    return(
        <Fragment>
            <MetaData title={'404 Page Not found'} />
            <div className="pagenot container">
                <div className="row">
                    <div className="col-11 col-md-6">
                        <div>
                            <img src="/images/404.png" className="img-fluid" alt="Page Not found" />
                        </div>
                    </div>
                    <div className="col-11 col-md-5">
                        <div className="pagenot-content">
                            <h1>Ooups, Page not found</h1>
                            <p>We ae very sorry for the inconvenience.It looks like you'r trying to access a page that has been deleted or never even existed</p>
                            <button onClick={()=> navigate('/')} className="btn-sc-primary px-4 py-2">Back To Home Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}