import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function FooterSection() {
  const navigate = useNavigate();

  const categoryArray = [
    "Accessories",
    "Cards",
    "Clothing",
    "Jewelries",
    "Handbages",
    "Toys",
    "Wallets",
  ];
  return (
    <Fragment>
      <div className="footer pt-5 pb-5 pb-md-0">
        <div className="row footer-line">
          <div className="col-12 col-md-3">
            <div className="navbars-logo">
              <div className="pointer" onClick={()=>navigate('/')}>
                <h2>Gift</h2>
                <h2>Shop</h2>
              </div>
            </div>
          </div>
          <div className="col-6 pt-4 pt-md-0 col-md-3">
            <ul className="footer-category">
              {categoryArray.map((cat)=>(
                <li key={cat} className="footer-category-item pointer" onClick={()=>navigate(`/product/filter/category/${cat}`)}>{cat}(6)</li>
              ))}
            </ul>
          </div>
          <div className="col-6 pt-4 pt-md-0 col-md-3">
            <ul className="footer-menu">
                <li className="footer-menu-item">About</li>
                <li className="footer-menu-item">Contact us</li>
                <li className="footer-menu-item">Faq</li>
                <li className="footer-menu-item">Shipping Policy</li>
            </ul>
          </div>
          <div className="col-10 ms-4 ms-md-0 pt-4 pb-4 pt-md-0 col-md-3">
            <form onSubmit={(e)=>e.preventDefault()} className="footer-subcribe">
                <h5>Sign up for special offer</h5>
                <input type="email" placeholder="Email Address" required/>
                <button type="submit" className="btn-sc-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 ps-md-5 footer-copy">
            <p className="ps-md-5">Copyright © 2023 Gift Shop | Powered by Gift Shop</p>
          </div>
          <div className="col-12 col-md-6">
            <ul className="footer-icons me-5 me-md-0 ms-md-5">
              <li><i className="bi bi-twitter"></i></li>
              <li ><i className="bi bi-linkedin"></i></li>
              <li><a  target="_blank" rel="noreferrer" href="https://www.instagram.com/_smiley_kumar_ak_/"><i className="bi bi-instagram"></i></a></li>
              <li><a  target="_blank" rel="noreferrer" href="https://www.facebook.com/masp.kumar.3"  ><i className="bi bi-facebook"></i></a></li>
              <li><i className="bi bi-youtube"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
