import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  HomeMenuChange, ProductMenuChange, navTogglerChange } from "../../slices/NavbarSlices";
import { Link } from "react-router-dom";


export default function NavMenuSlideBar({navshow}){
    const {homeMenu,productsMenu,aboutMenu,contactUsMenu} = useSelector((state)=> state.NavbarState)

    const dispatch = useDispatch()

    return(
        <Fragment>
            <div className={`navmenu ${navshow?"menu-show":""}`}>
                <div className="navmenu-header">
                    <h6>Navbar menu</h6>
                    <i onClick={()=>dispatch(navTogglerChange(false))} className="bi bi-x"></i>
                </div>
                <ul className="navmenu-ul">
                    <Link to={'/'}><li onClick={()=>dispatch(HomeMenuChange())} className={`navmenu-ul-li ${homeMenu?"menu-active":''}`}><i className="fi fi-br-house-chimney"></i> <span>Home</span></li></Link>
                    <Link to={'/products'}><li onClick={()=>dispatch(ProductMenuChange())} className={`navmenu-ul-li ${productsMenu?"menu-active":''}`}> <i className="fi fi-rr-box-open"></i> <span>Products</span></li></Link>
                    <li  className={`navmenu-ul-li ${aboutMenu?"menu-active":''}`}> <i className="fi fi-bs-info"></i> About</li>
                    <li  className={`navmenu-ul-li ${contactUsMenu?"menu-active":''}`}> <i className="fi fi-rr-paper-plane"></i> <span>Contact us</span></li>
                </ul>
            </div>
        </Fragment>
    )
}